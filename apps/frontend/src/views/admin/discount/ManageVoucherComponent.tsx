import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useParams } from "react-router-dom";

const ManageVoucherComponent = () => {
  const [coupons, setCoupons] = useState<any>();
  const navigate = useNavigate();
  const [inputFocused, setInputFocused] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { action } = useParams<{ action: string }>();
  const { id } = useParams<{ id: string }>();
  console.log(action, id, "adasdasdAsdASdASd");

  const handleInputFocus = (name: string, focused: boolean) => {
    setInputFocused({ ...inputFocused, [name]: focused });
  };

  const handleChangeInput = (event?: any) => {
    let { value, name } = event.target;
    if (value === " ") return;
    if (value?.length > 1000) return;
    setCoupons({
      ...coupons,
      [name]: value,
    });
  };

  useEffect(() => {
    if (id != undefined) {
      loadData(id);
    }
  }, [id]);

  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const loadData = async (id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/phieu-giam-gia/${id}`
      );
      setCoupons(response?.data);
      console.log(response?.data, "sdasadsd");
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };

  const [todos, setTodos] = useState<any[]>([]);
  console.log(action, "setTodosAction");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/khachhang");
      setTodos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };
  console.log(todos, "ahahaha");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        soLuong: coupons?.soLuong ? coupons?.soLuong : null,
        // trangThai: coupons?.trangThai ? coupons?.trangThai : null,
        loaiPhieu: coupons?.loaiPhieu ? coupons?.loaiPhieu : null,
        ten: coupons?.ten ? coupons?.ten : null,
        tongTienToiThieu: coupons?.tongTienToiThieu
          ? coupons?.tongTienToiThieu
          : null,
        phanTramToiDa: coupons?.phanTramToiDa ? coupons?.phanTramToiDa : null,
        thoiGianKetThuc: coupons?.thoiGianKetThuc
          ? coupons?.thoiGianKetThuc
          : null,
        thoiGianBatDau: coupons?.thoiGianBatDau
          ? coupons?.thoiGianBatDau
          : null,
        ma: coupons?.ma ? coupons?.ma : null,
        khachHangs: [],
      };
      const config = {
        method: "post", // Chỉ định method là POST
        url: "http://localhost:8080/admin/phieu-giam-gia/add",
        data: data, // Dữ liệu gửi đi trong body của request
      };

      const response = await axios(config);
      navigate("/manage/khuyen-mai/list");
      console.log(response.data, "sssdasd");
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        soLuong: coupons?.soLuong ?? null,
        loaiPhieu: coupons?.loaiPhieu ?? null,
        ten: coupons?.ten ?? null,
        tongTienToiThieu: coupons?.tongTienToiThieu ?? null,
        phanTramToiDa: coupons?.phanTramToiDa ?? null,
        thoiGianKetThuc: coupons?.thoiGianKetThuc ?? null,
        trangThai: coupons?.trangThai ? coupons?.trangThai : undefined,
        thoiGianBatDau: coupons?.thoiGianBatDau ?? null,
        ma: coupons?.ma ?? null,
        khachHangs: [],
      };

      const config = {
        method: "put", // Change method to PUT for editing
        url: `http://localhost:8080/admin/phieu-giam-gia/${id}`, // Include coupon ID in URL
        data: data, // Data to be sent in request body
      };

      const response = await axios(config);
      navigate("/manage/khuyen-mai/list");
      console.log(response.data, "Edit Response");
    } catch (error) {
      console.error("Error editing coupon: ", error);
    }
  };

  const handleCheckboxChange = (item: any) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const handleClicks = () => {
    // if (id != undefined) {
    handleEdit();
    // } else {
    // handleSubmit();
    // }
  };
  return (
    <div className="grid grid-cols-2 gap-6">
      <Fragment>
        <div className="w-[100%] h-[85vh]  p-6 bg-white rounded-lg shadow-xl overflow-y-auto">
          <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700">
            Phiếu giảm giá
          </h2>
          <h1 className="text-xl font-semibold mb-6 text-indigo-600">
            {id != undefined && action == "edit" ? "Chỉnh sửa " : "Thêm mới "}
            phiếu giảm giá
          </h1>
          <form
            onSubmit={
              id == undefined && !id && action != "edit"
                ? handleSubmit
                : handleEdit
            }
            name="phieuGiamGiaForm"
          >
            {/* Mã phiếu giảm giá */}
            <div className="form-group mb-4 relative">
              <label
                htmlFor="ten"
                className="block text-sm font-medium text-gray-700"
              >
                Mã phiếu :
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="ma"
                name="ma"
                value={coupons?.ma || ""}
                onChange={(e: any) => handleChangeInput(e)}
                onFocus={() => handleInputFocus("ma", true)}
                onBlur={() => handleInputFocus("ma", false)}
                maxLength={10}
                required
              />
              {inputFocused["ma"] && (
                <span className="block text-sm font-medium text-red-500 mt-1 absolute left-0">
                  Có thể auto tạo hoặc tạo bằng tay
                </span>
              )}
            </div>
            {/* tên */}
            <div className="form-group mb-4">
              <label
                htmlFor="ten"
                className="block text-sm font-medium text-gray-700"
              >
                * Tên :
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="ten"
                name="ten"
                value={coupons?.ten || ""}
                onChange={(e: any) => handleChangeInput(e)}
                maxLength={10}
                required
              />
            </div>
            {/* Giá trị giảm */}
            <div className="form-group mb-4">
              <label
                htmlFor="phanTramToiDa"
                className="block text-sm font-medium text-gray-700"
              >
                Giá trị giảm
              </label>
              <input
                type="number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e: any) => handleChangeInput(e)}
                id="phanTramToiDa"
                value={coupons?.phanTramToiDa || ""}
                name="phanTramToiDa"
                required
              />
            </div>

            {/* Ngày bắt đầu và Ngày kết thúc */}
            <div className="flex space-x-4 mb-4">
              <div className="form-group w-1/2">
                <label
                  htmlFor="thoiGianBatDau"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ngày bắt đầu
                </label>
                <input
                  type="datetime-local"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e: any) => handleChangeInput(e)}
                  id="thoiGianBatDau"
                  value={coupons?.thoiGianBatDau || ""}
                  name="thoiGianBatDau"
                  required
                />
              </div>
              <div className="form-group w-1/2">
                <label
                  htmlFor="thoiGianKetThuc"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ngày kết thúc
                </label>
                <input
                  type="datetime-local"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="thoiGianKetThuc"
                  value={coupons?.thoiGianKetThuc || ""}
                  onChange={(e: any) => handleChangeInput(e)}
                  name="thoiGianKetThuc"
                  required
                />
              </div>
            </div>

            {/* Số lượng phiếu và Giá trị đơn tối thiểu */}
            <div className="flex space-x-4 mb-4">
              <div className="form-group w-1/2">
                <label
                  htmlFor="soLuong"
                  className="block text-sm font-medium text-gray-700"
                >
                  Số lượng phiếu
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e: any) => handleChangeInput(e)}
                  value={coupons?.soLuong || ""}
                  id="soLuong"
                  name="soLuong"
                  required
                />
              </div>
              <div className="form-group w-1/2">
                <label
                  htmlFor="tongTienToiThieu"
                  className="block text-sm font-medium text-gray-700"
                >
                  Giá trị đơn tối thiểu
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e: any) => handleChangeInput(e)}
                  value={coupons?.tongTienToiThieu || "---"}
                  id="tongTienToiThieu"
                  name="tongTienToiThieu"
                  required
                />
              </div>
            </div>

            {/* Giá trị giảm tối đa và Trạng Thái */}
            <div className="flex space-x-4 mb-7">
              {/* <div className="form-group w-1/2">
                <label
                  htmlFor="loaiPhieu"
                  value={coupons?.loaiPhieu || "---"}
                  className="block text-sm font-medium text-gray-700"
                >
                  Loại
                </label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="loaiPhieu"
                  onChange={(e: any) => handleChangeInput(e)}
                  name="loaiPhieu"
                >
                  <option value="Don">Đơn</option>
                  <option value="Don"> Khách hàng</option>
                </select>
              </div> */}
              <div className="form-group w-1/2">
                <label
                  htmlFor="loaiPhieu"
                  className="block text-sm font-medium text-gray-700"
                >
                  Loại
                </label>
                <div className="mt-1 flex items-center">
                  <div className="flex items-center mr-4">
                    <input
                      type="radio"
                      id="loaiPhieuDon"
                      name="loaiPhieu"
                      value="Don"
                      checked={coupons?.loaiPhieu === "Don"}
                      onChange={(e: any) => handleChangeInput(e)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="loaiPhieuDon"
                      className="ml-2 block text-sm font-medium text-gray-700"
                    >
                      Đơn
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="loaiPhieuKhachHang"
                      name="loaiPhieu"
                      value="KhachHang"
                      checked={coupons?.loaiPhieu === "KhachHang"}
                      onChange={(e: any) => handleChangeInput(e)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="loaiPhieuKhachHang"
                      className="ml-2 block text-sm font-medium text-gray-700"
                    >
                      Khách hàng
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleClicks()}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {id != undefined && action == "edit" ? "Chỉnh sửa" : "Tạo mới"}
            </button>
          </form>
        </div>
      </Fragment>
      <Fragment>
        <div className="w-[100%] h-[85vh]  p-6 bg-white rounded-lg shadow-xl overflow-y-auto">
          <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700">
            Danh sách
          </h2>
          <form name="phieuGiamGiaForm">
            <div className="form-group mb-4">
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="maPhieu"
                placeholder="Tìm kiếm sản phẩm"
                name="maGiamGia"
                maxLength={10}
                required
              />
            </div>
            {/* Mã phiếu giảm giá */}
            <div className="w-full h-[85vh] bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
              <h1 className="text-xl font-semibold mb-6 text-indigo-600">
                Danh sách khách hàng
              </h1>
              <table className="min-w-full bg-white">
                <thead className="bg-gray-200 text-gray-600">
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300">
                      Select
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300">ID</th>
                    <th className="py-2 px-4 border-b border-gray-300">Name</th>
                    <th className="py-2 px-4 border-b border-gray-300">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item)}
                          onChange={() => handleCheckboxChange(item)}
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {item.id}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {item.hoTen}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {item.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </Fragment>
    </div>
  );
};

export default ManageVoucherComponent;
