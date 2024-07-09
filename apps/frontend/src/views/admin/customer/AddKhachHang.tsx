import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddKhachHang: React.FC = () => {
  // const [ma, setMa] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [email, setEmail] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [trangThai, setTrangThai] = useState("active");
  const [diaChiNhan, setDiaChiNhan] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formattedNgaySinh = new Date(ngaySinh).toISOString().split(".")[0];

    const newCustomer = {
      // ma,
      hoTen,
      email,
      soDienThoai,
      ngaySinh: formattedNgaySinh,
      trangThai,
      diaChiNhan,
    };

    axios
      .post("http://localhost:8080/api/khachhang", newCustomer)
      .then((response) => {
        navigate("/manage/khach-hang", {
          state: { newCustomer: response.data },
        });
      })
      .catch((error) => {
        console.error("Error adding customer: ", error);
      });
  };

  return (
    <div className="max-w-5xl mx-auto overflow-auto border border-gray-300 rounded-md shadow-md mt-3 p-4">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold mb-4 mt-2">Thêm Khách Hàng</h2>
        <hr className="border-gray-500" />
        <form onSubmit={handleSubmit} className="space-y-2 mt-1">
          {/* <div>
            <label className="block text-sl font-bold whitespace-nowrap mb-2">
              Mã khách hàng:
            </label>
            <input
              type="text"
              placeholder="Mã khách hàng"
              className="border p-2 rounded w-full"
              value={ma}
              onChange={(e) => setMa(e.target.value)}
              required
            />
          </div> */}
          <div>
            <label className="block text-sl font-bold whitespace-nowrap mb-2">
              Tên khách hàng:
            </label>
            <input
              type="text"
              placeholder="Tên khách hàng"
              className="border p-2 rounded w-full"
              value={hoTen}
              onChange={(e) => setHoTen(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sl font-bold whitespace-nowrap mb-2">
              Email:
            </label>
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sl font-bold whitespace-nowrap mb-2">
              Số Điện Thoại:
            </label>
            <input
              type="text"
              placeholder="Số Điện Thoại"
              className="border p-2 rounded w-full"
              value={soDienThoai}
              onChange={(e) => setSoDienThoai(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sl font-bold whitespace-nowrap mb-2">
              Ngày Sinh:
            </label>
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={ngaySinh}
              onChange={(e) => setNgaySinh(e.target.value)}
              required
            />
          </div>
          <div className="">
            <label className="block text-sl font-bold whitespace-nowrap mb-2">
              Trạng thái:
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={trangThai}
                onChange={(e) => setTrangThai(e.target.value)}
              >
                <option value="active">Kích hoạt</option>
                <option value="inactive">Chưa kích hoạt</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sl font-bold whitespace-nowrap mb-2">
              Địa chỉ:
            </label>
            <input
              type="text"
              placeholder="Địa chỉ"
              className="border p-2 rounded w-full"
              value={diaChiNhan}
              onChange={(e) => setDiaChiNhan(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
          >
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddKhachHang;
