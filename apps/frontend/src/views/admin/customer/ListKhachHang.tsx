import { Button } from "@mui/material";
import KhachHangEntity from "../../../entity/KhachHang";
import DeleteButton from "./icon/DeleteButton";
import EditButton from "./icon/EditButton";
import { useNavigate } from "react-router-dom";

interface KhachHangProps {
  khachHang: KhachHangEntity;
  index: number;
  onDelete: (id: number) => void;
}

const ListKhacHang: React.FC<KhachHangProps> = ({
  khachHang,
  index,
  onDelete,
}) => {
  // Xử lý ngày sinh
  const ngaySinhFormatted = khachHang.ngaySinh
    ? new Date(khachHang.ngaySinh).toLocaleDateString()
    : "";

  // hàm xử lý xóa khách hàng
  const handleDeletedClick = () => {
    onDelete(khachHang.id);
  };

  const navigate = useNavigate();
  const handleAddDiaChiClick = () => {
    navigate("/manage/add-diaChi");
  };

  return (
    <tr>
      {/* <td className="px-4 py-2">{khachHang.id}</td> */}
      <td className="px-4 py-2">{index}</td>
      {/* <td className="px-4 py-2">{khachHang.ma}</td> */}
      <td className="px-4 py-2">{khachHang.hoTen}</td>
      <td className="px-4 py-2">{khachHang.email}</td>
      <td className="px-4 py-2">{khachHang.soDienThoai}</td>
      <td className="px-4 py-2">{ngaySinhFormatted}</td>
      <td className="px-4 py-2">
        {khachHang.diaChiNhan?.diaChi ?? "Chưa có địa chỉ"}
      </td>
      <td className="px-4 py-2">
        {khachHang.trangThai === "active" ? "Kích hoạt" : "Chưa kích hoạt"}
      </td>

      <td className="px-4 py-2">
        <div className="flex gap-2">
          {/* <Button variant="outlined" onClick={() => {}}>
            Update
          </Button> */}
          {/* <Button
            variant="outlined"
            onClick={() => {
              handleDeletedClick();
            }}
          >
            Thao tác
          </Button> */}

          <Button onClick={handleAddDiaChiClick}>
            <EditButton />
          </Button>
          <Button
            onClick={() => {
              handleDeletedClick();
            }}
          >
            <DeleteButton />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ListKhacHang;
