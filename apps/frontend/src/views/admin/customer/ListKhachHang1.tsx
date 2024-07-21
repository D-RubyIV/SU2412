import { Button } from "@mui/material";
import EditButton from "./icon/EditButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { KhachHang } from "./entity/KhachHang";

interface KhachHangProps {
  khachHang: KhachHang;
  index: number;
  onDelete: (id: number) => void;
}

const ListKhacHang1: React.FC<KhachHangProps> = ({
  khachHang,
  index,
  // onDelete,
}) => {
  // Xử lý ngày sinh
  const ngaySinhFormatted = khachHang.ngaySinh
    ? new Date(khachHang.ngaySinh).toLocaleDateString()
    : "";

  const [isActive, setIsActive] = useState(khachHang.trangThai === "active");
  const handleToggleClick = () => {
    setIsActive(!isActive);
  };

  const navigate = useNavigate();
  const handleAddDiaChiClick = () => {
    if (khachHang && khachHang.id) {
      console.log("Navigating to edit page for KhachHang ID:", khachHang.id);
      navigate(`/manage/update/${khachHang.id}`);
    } else {
      console.error("KhachHang or KhachHang ID is not valid.");
    }
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
        <span
          style={{
            backgroundColor: isActive ? "#d4edda" : "#f8d7da",
            color: isActive ? "#008000" : "#606dbc",
            fontWeight: "bold",
            borderRadius: "12px",
            padding: "2px 8px",
            display: "inline-block",
          }}
        >
          {isActive ? "Kích hoạt" : "Đã kích hoạt"}
        </span>
      </td>

      <td className="px-4 py-2">
        <div className="flex gap-2">
          <Button onClick={handleAddDiaChiClick}>
            <EditButton />
          </Button>
          <Button onClick={handleToggleClick}>
            <div
              className={`rounded-full w-10 h-5 flex items-center justify-center ${
                isActive ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`rounded-full w-4 h-4 bg-white shadow-md transform transition-transform ${
                  isActive ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ListKhacHang1;
