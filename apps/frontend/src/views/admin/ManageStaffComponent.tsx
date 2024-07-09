import React, { useState, Fragment } from "react";
import {
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

type Staff = {
  id: number;
  ma: string;
  gioiTinh: string;
  hoTen: string;
  soDienThoai: string;
  email: string;
  password: string;
  cccd: string;
  ngaySinh: string;
  trangThai: string;
  ghiChu: string;
};

const initialStaffList: Staff[] = [
  {
    id: 1,
    ma: "NV001",
    gioiTinh: "Nam",
    hoTen: "Nguyen Van A",
    soDienThoai: "0912345678",
    email: "a@example.com",
    password: "password1",
    cccd: "123456789",
    ngaySinh: "1990-01-01",
    trangThai: "Đang làm việc",
    ghiChu: "None",
  },
  {
    id: 2,
    ma: "NV002",
    gioiTinh: "Nam",
    hoTen: "Nguyen Van B",
    soDienThoai: "09352441784",
    email: "a@example.com",
    password: "password1",
    cccd: "084673273",
    ngaySinh: "1993-11-01",
    trangThai: "Đang làm việc",
    ghiChu: "None",
  },
  {
    id: 3,
    ma: "NV003",
    gioiTinh: "Nữ",
    hoTen: "Nguyen Van C",
    soDienThoai: "09352441784",
    email: "a@example.com",
    password: "password1",
    cccd: "084673273",
    ngaySinh: "1993-11-01",
    trangThai: "Đang làm việc",
    ghiChu: "None",
  },
  {
    id: 4,
    ma: "NV004",
    gioiTinh: "Nam",
    hoTen: "Nguyen Van D",
    soDienThoai: "09352441784",
    email: "a@example.com",
    password: "password1",
    cccd: "084673273",
    ngaySinh: "1993-11-01",
    trangThai: "Đang làm việc",
    ghiChu: "None",
  },
  {
    id: 5,
    ma: "NV005",
    gioiTinh: "Nam",
    hoTen: "Nguyen Van F",
    soDienThoai: "09352441784",
    email: "a@example.com",
    password: "password1",
    cccd: "084673273",
    ngaySinh: "1993-11-01",
    trangThai: "Đang làm việc",
    ghiChu: "None",
  },
  {
    id: 6,
    ma: "NV006",
    gioiTinh: "Nam",
    hoTen: "Nguyen Van G",
    soDienThoai: "09352441784",
    email: "a@example.com",
    password: "password1",
    cccd: "084673273",
    ngaySinh: "1993-11-01",
    trangThai: "Đang làm việc",
    ghiChu: "None",
  },
];

const ManageStaffComponent = () => {
  const [staffList, setStaffList] = useState<Staff[]>(initialStaffList);
  const [newStaff, setNewStaff] = useState<Staff>({
    id: 0,
    ma: "",
    gioiTinh: "Nam",
    hoTen: "",
    soDienThoai: "",
    email: "",
    password: "",
    cccd: "",
    ngaySinh: "",
    trangThai: "Đang làm việc",
    ghiChu: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Số lượng nhân viên trên mỗi trang

  const validateForm = () => {
    let errors: { [key: string]: string } = {};

    if (!newStaff.hoTen) {
      errors.hoTen = "Họ tên không được để trống";
    }

    if (!newStaff.soDienThoai) {
      errors.soDienThoai = "Số điện thoại không được để trống";
    } else if (!/^\d{10,11}$/.test(newStaff.soDienThoai)) {
      errors.soDienThoai = "Số điện thoại không hợp lệ";
    }

    if (!newStaff.email) {
      errors.email = "Email không được để trống";
    } else if (!/^\S+@\S+\.\S+$/.test(newStaff.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!newStaff.cccd) {
      errors.cccd = "CCCD không được để trống";
    }

    if (!newStaff.ngaySinh) {
      errors.ngaySinh = "Ngày sinh không được để trống";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddStaff = () => {
    if (validateForm()) {
      const newId =
        staffList.length > 0
          ? Math.max(...staffList.map((staff) => staff.id)) + 1
          : 1;
      const staffToAdd = {
        ...newStaff,
        id: newId,
        ma: `NV${newId.toString().padStart(3, "0")}`,
      };
      setStaffList([...staffList, staffToAdd]);
      resetForm();
      setIsUpdating(false); // Ẩn form sau khi thêm
    }
  };

  const handleUpdateStaff = () => {
    if (!selectedStaffId) return;

    if (validateForm()) {
      setStaffList(
        staffList.map((staff) =>
          staff.id === selectedStaffId ? newStaff : staff
        )
      );
      resetForm();
    }
  };

  const handleDeleteStaff = (staffId: number) => {
    setStaffList(staffList.filter((staff) => staff.id !== staffId));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setNewStaff((prevStaff) => ({
      ...prevStaff,
      [name as string]: value,
    }));
  };

  const handleEditClick = (staff: Staff) => {
    setNewStaff({ ...staff });
    setSelectedStaffId(staff.id);
    setIsUpdating(true);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedStaffId) {
      handleUpdateStaff();
    } else {
      handleAddStaff();
    }
  };

  const resetForm = () => {
    setNewStaff({
      id: 0,
      ma: "",
      gioiTinh: "Nam",
      hoTen: "",
      soDienThoai: "",
      email: "",
      password: "",
      cccd: "",
      ngaySinh: "",
      trangThai: "Đang làm việc",
      ghiChu: "",
    });
    setSelectedStaffId(null);
    setIsUpdating(false);
    setFormErrors({});
  };

  const handleChangePage = (page: number) => {
    setActivePage(page);
  };

  const handlePreviousPage = () => {
    setActivePage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setActivePage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(staffList.length / itemsPerPage))
    );
  };

  return (
    <Fragment>
      <div className="text-center mt-4">
        <h2 className="px-3 py-4 text-3xl font-medium text-gray-700 uppercase tracking-wider">
          QUẢN LÝ NHÂN VIÊN
        </h2>
      </div>

      <div className="flex justify-end mb-4">
        <div className="space-x-4">
          {!isUpdating ? (
            <Button
              variant="contained"
              color="success"
              onClick={() => setIsUpdating(true)}
            >
              Thêm Nhân Viên
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelEdit}
            >
              Trở Về
            </Button>
          )}
          <Button variant="contained" color="primary">
            Quét CCCD
          </Button>
        </div>
      </div>

      {isUpdating && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            {selectedStaffId ? "Sửa Nhân Viên" : "Thêm Nhân Viên"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                name="hoTen"
                label="Họ tên"
                variant="outlined"
                fullWidth
                value={newStaff.hoTen}
                onChange={handleInputChange}
                error={!!formErrors.hoTen}
                helperText={formErrors.hoTen}
              />
              <FormControl
                variant="outlined"
                fullWidth
                error={!!formErrors.gioiTinh}
              >
                <InputLabel htmlFor="gioiTinh">Giới tính</InputLabel>
                <Select
                  name="gioiTinh"
                  value={newStaff.gioiTinh}
                  onChange={handleInputChange}
                  label="Giới tính"
                  inputProps={{
                    id: "gioiTinh",
                  }}
                >
                  <MenuItem value="Nam">Nam</MenuItem>
                  <MenuItem value="Nữ">Nữ</MenuItem>
                  <MenuItem value="Khác">Khác</MenuItem>
                </Select>
              </FormControl>
              <TextField
                name="soDienThoai"
                label="Số điện thoại"
                variant="outlined"
                fullWidth
                value={newStaff.soDienThoai}
                onChange={handleInputChange}
                error={!!formErrors.soDienThoai}
                helperText={formErrors.soDienThoai}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={newStaff.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
              <TextField
                name="cccd"
                label="CCCD"
                variant="outlined"
                fullWidth
                value={newStaff.cccd}
                onChange={handleInputChange}
                error={!!formErrors.cccd}
                helperText={formErrors.cccd}
              />
              <TextField
                name="ngaySinh"
                label="Ngày sinh"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={newStaff.ngaySinh}
                onChange={handleInputChange}
                error={!!formErrors.ngaySinh}
                helperText={formErrors.ngaySinh}
              />
              <FormControl component="fieldset" error={!!formErrors.trangThai}>
                <FormLabel component="legend">Trạng thái</FormLabel>
                <RadioGroup
                  aria-label="trangThai"
                  name="trangThai"
                  value={newStaff.trangThai}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="Đang làm việc"
                    control={<Radio />}
                    label="Đang làm việc"
                    checked={newStaff.trangThai === "Đang làm việc"}
                  />
                  <FormControlLabel
                    value="Đã nghỉ việc"
                    control={<Radio />}
                    label="Đã nghỉ việc"
                    checked={newStaff.trangThai === "Đã nghỉ việc"}
                  />
                </RadioGroup>
                <FormHelperText error>{formErrors.trangThai}</FormHelperText>
              </FormControl>
              <TextField
                name="ghiChu"
                label="Ghi chú"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={newStaff.ghiChu}
                onChange={handleInputChange}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="success"
              className="mt-4"
            >
              {selectedStaffId ? "Sửa Nhân Viên" : "Thêm Nhân Viên"}
            </Button>
          </form>
        </div>
      )}
      {/* <div className=" mt-4">
                <h2 className="px-3 py-4 text-2x font-medium text-gray-700 uppercase tracking-wider">DANH SÁCH NHÂN VIÊN</h2>
            </div> */}

      {!isUpdating && (
        <div className="overflow-auto border border-gray-300 rounded-md shadow-md mt-3">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-100 z-50">
              <tr className="text-left">
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STT
                </th>
                <th className="px-3 py4- text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã Nhân Viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Họ và Tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giới tính
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số Điện Thoại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày Sinh
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng Thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staffList
                .slice(
                  (activePage - 1) * itemsPerPage,
                  activePage * itemsPerPage
                )
                .map((staff, index) => (
                  <tr key={staff.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2">
                      {(activePage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-2">{staff.ma}</td>
                    <td className="px-4 py-2">{staff.hoTen}</td>
                    <td className="px-4 py-2">{staff.gioiTinh}</td>
                    <td className="px-4 py-2">{staff.soDienThoai}</td>
                    <td className="px-4 py-2">{staff.cccd}</td>
                    <td className="px-4 py-2">
                      {new Date(staff.ngaySinh).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{staff.trangThai}</td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <Button
                          variant="outlined"
                          size="small"
                          color="info"
                          onClick={() => handleEditClick(staff)}
                        >
                          Sửa
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDeleteStaff(staff.id)}
                        >
                          Xóa
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Phân trang */}
          <div
            className="flex justify-center items-center py-4"
            style={{
              position: "absolute",
              bottom: 80,
              left: "57%",
              transform: "translateX(-50%)",
              width: "80%",
            }}
          >
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={handlePreviousPage}
              disabled={activePage === 1}
              style={{ fontSize: "15px" }}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Trang trước
            </Button>
            <div className="flex gap-2 mx-4">
              {[
                ...Array(Math.ceil(staffList.length / itemsPerPage)).keys(),
              ].map((pageNumber) => (
                <IconButton
                  key={pageNumber + 1}
                  onClick={() => handleChangePage(pageNumber + 1)}
                  color={activePage === pageNumber + 1 ? "blue" : "gray"}
                  variant={activePage === pageNumber + 1 ? "filled" : "text"}
                  style={{ fontSize: "15px" }}
                >
                  {pageNumber + 1}
                </IconButton>
              ))}
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={handleNextPage}
              disabled={
                activePage === Math.ceil(staffList.length / itemsPerPage)
              }
              style={{ fontSize: "15px" }}
            >
              Trang sau
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ManageStaffComponent;
