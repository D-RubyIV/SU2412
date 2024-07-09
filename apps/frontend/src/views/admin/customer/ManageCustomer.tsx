import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { useLocation, useNavigate } from "react-router-dom";
import KhachHangEntity from "../../../entity/KhachHang";
import axios from "axios";
import ListKhacHang from "./ListKhachHang";

const ManageCustomer = () => {
  const [khachHangList, setKhachHangList] = useState<KhachHangEntity[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const newCustomer = location.state?.newCustomer;

  useEffect(() => {
    fetchListKhachHang();
  }, []);

  useEffect(() => {
    if (newCustomer) {
      setKhachHangList((prevList) => [newCustomer, ...prevList]);
    }
  }, [newCustomer]);

  const fetchListKhachHang = () => {
    axios
      .get("http://localhost:8080/api/khachhang")
      .then((response) => {
        setKhachHangList(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách khách hàng: ", error);
      });
  };

  /* tìm kiếm */
  const handleSearch = () => {
    axios
      .get(`http://localhost:8080/api/khachhang/search`, {
        params: {
          keyword: searchValue,
        },
      })
      .then((response) => {
        setKhachHangList(response.data);
        setSearchValue("");
      })
      .catch((error) => {
        console.error("Lỗi khi tìm kiếm khách hàng: ", error);
      });
  };

  /* xóa */
  const deleteKhachHang = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/khachhang/${id}`);
      const newKhachHangList = khachHangList.filter((kh) => kh.id !== id);
      setKhachHangList(newKhachHangList);
    } catch (error) {
      console.error("Lỗi khi xóa khách hàng: ", error);
    }
  };

  const handleAddCustomerClick = () => {
    navigate("/manage/add-customer");
  };

  return (
    <Fragment>
      <h1 className="text-3xl font-bold mb-4">Quản lý tài khoản khách hàng</h1>
      <div className="">
        {/* Bộ lọc */}
        <div className="overflow-auto border border-gray-300 rounded-md shadow-md">
          <div className="border-b px-4">
            <h1 className="text-2xl font-bold">Bộ lọc</h1>
            <hr className="border-gray-500" />
            <div className="p-9">
              <div className="flex gap-4 mt-3 items-center">
                <label className="text-sl font-bold whitespace-nowrap">
                  Tìm kiếm:
                </label>
                <input
                  type="text"
                  placeholder="Tìm kiếm tên và số điện thoại..."
                  className="border p-2 rounded basis-1/4 me-48"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <label className="text-sl font-bold whitespace-nowrap">
                  Ngày sinh:
                </label>
                <input type="date" className="border p-2 rounded flex-1" />
                <input type="date" className="border p-2 rounded flex-1" />
              </div>
              <div className="flex gap-4 mt-8 items-center">
                <label className="text-sl font-bold whitespace-nowrap">
                  Trạng thái:
                </label>
                <select
                  className="border p-2 flex-initial basis-1/4 me-48"
                  style={{ width: "25%" }}
                >
                  <option value="all">Tất cả</option>
                  <option value="active">Kích hoạt</option>
                  <option value="inactive">Chưa kích hoạt</option>
                </select>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSearch}
                >
                  Tìm kiếm
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={fetchListKhachHang}
                >
                  Làm mới bộ lọc
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách khách hàng */}
        <div className="flex justify-between items-center mb-2 mt-4">
          <h2 className="text-lg font-bold">Danh sách khách hàng</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddCustomerClick}
          >
            + Thêm
          </button>
        </div>

        <div className="mt-4">
          <div className="overflow-auto max-h-[370px] border border-gray-300 rounded-md shadow-md">
            <table className="table-auto md:table-fixed w-full text-sm">
              <thead className="sticky top-0 bg-gray-200 z-50">
                <tr className="text-left">
                  <th className="border p-2">STT</th>
                  {/* <th className="border p-2">Mã khách hàng</th> */}
                  <th className="border p-2">Tên khách hàng</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Số điện thoại</th>
                  <th className="border p-2">Ngày sinh</th>
                  <th className="border p-2">Địa chỉ</th>
                  <th className="border p-2">Trạng Thái</th>
                  <th className="border p-2">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {khachHangList.map((khachHang, index) => (
                  <ListKhacHang
                    key={khachHang.id}
                    khachHang={khachHang}
                    index={index + 1}
                    onDelete={deleteKhachHang}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ManageCustomer;
