import { Fragment, useEffect, useState } from "react";
import { Button, Switch } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";

export default function ListVoucher() {
  const [todos, setTodos] = useState<any[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDateStart, setSearchDateStart] = useState("");
  const [searchDateEnd, setSearchDateEnd] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { action } = useParams<{ action: string }>();
  console.log(action, "setTodosAction");
  const navigate = useNavigate();

  const handleSearch = () => {
    let filtered = todos;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.ma.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (searchDateStart) {
      filtered = filtered.filter(
        (item) => item.thoiGianBatDau >= searchDateStart
      );
    }

    if (searchDateEnd) {
      filtered = filtered.filter(
        (item) => item.thoiGianKetThuc <= searchDateEnd
      );
    }

    if (searchValue) {
      filtered = filtered.filter(
        (item) => item.tongTienToiThieu >= searchValue
      );
    }

    setFilteredTodos(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, searchDateStart, searchDateEnd, searchValue]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/phieu-giam-gia/get-all"
      );
      setTodos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };
  console.log(todos, "ahahaha");

  return (
    <Fragment>
      <div className="mt-6 flex justify-between items-center">
        <div className="flex space-x-4 w-full">
          <div className="flex-1">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              Tìm kiếm phiếu giảm giá:
            </label>
            <input
              type="text"
              id="search"
              name="search"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Nhập mã phiếu để tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="searchDateStart"
              className="block text-sm font-medium text-gray-700"
            >
              Ngày bắt đầu:
            </label>
            <input
              type="date"
              id="searchDateStart"
              name="searchDateStart"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={searchDateStart}
              onChange={(e) => setSearchDateStart(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="searchDateEnd"
              className="block text-sm font-medium text-gray-700"
            >
              Ngày kết thúc:
            </label>
            <input
              type="date"
              id="searchDateEnd"
              name="searchDateEnd"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={searchDateEnd}
              onChange={(e) => setSearchDateEnd(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="searchValue"
              className="block text-sm font-medium text-gray-700"
            >
              Giá trị tối thiểu:
            </label>
            <input
              type="number"
              id="searchValue"
              name="searchValue"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Nhập giá trị tối thiểu..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <fieldset className="flex flex-col">
              <legend className="block text-sm font-medium text-gray-700">
                Trạng thái:
              </legend>
              <div className="mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600 focus:ring-indigo-500"
                    name="status"
                    value="all"
                    checked={status === "all"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <span className="ml-2 text-sm text-gray-600">Tất cả</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600 focus:ring-indigo-500"
                    name="status"
                    value="upcoming"
                    checked={status === "upcoming"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Sắp diễn ra
                  </span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600 focus:ring-indigo-500"
                    name="status"
                    value="ongoing"
                    checked={status === "ongoing"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Đang diễn ra
                  </span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio text-indigo-600 focus:ring-indigo-500"
                    name="status"
                    value="ended"
                    checked={status === "ended"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Đã kết thúc
                  </span>
                </label>
              </div>
            </fieldset>
          </div>
        </div>
        <Button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {}}
        >
          Thêm Mới
        </Button>
      </div>

      <div className="w-70% h-50% overflow-y-auto border border-gray-300 rounded-md shadow-md mt-2">
        <table className="table-auto md:table-fixed w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                STT
              </th>
              <th scope="col" className="py-3 px-6">
                Mã Phiếu
              </th>
              <th scope="col" className="py-3 px-6">
                Tên Phiếu
              </th>
              <th scope="col" className="py-3 px-6">
                Loại
              </th>
              <th scope="col" className="py-3 px-6">
                Số Lượng
              </th>
              <th scope="col" className="py-3 px-6">
                Điều Kiện
              </th>
              <th scope="col" className="py-3 px-6">
                Ngày Bắt Đầu
              </th>
              <th scope="col" className="py-3 px-6">
                Ngày Kết Thúc
              </th>
              <th scope="col" className="py-3 px-6">
                Trạng Thái
              </th>
              <th scope="col" className="py-3 px-6">
                Hành Động
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {todos.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.ma}</td>
                <td className="px-4 py-2">{item.ten}</td>
                <td className="px-4 py-2">{item.loaiPhieu}</td>
                <td className="px-4 py-2">{item.soLuong}</td>
                <td className="px-4 py-2">{item.tongTienToiThieu}</td>
                <td className="px-4 py-2">{item.thoiGianBatDau}</td>
                <td className="px-4 py-2">{item.thoiGianKetThuc}</td>
                <td className="px-4 py-2">
                  {/* <span
                    className={`inline-block whitespace-nowrap rounded-full bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-danger-700 dark:bg-[#2c0f14] dark:text-danger-500 ${
                      item.trangThai === "Hoạt Động"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.trangThai}
                  </span> */}
                  <span
                    className={`inline-block whitespace-nowrap rounded-full ${
                      item.trangThai === "Đã kết thúc"
                        ? "bg-gray-300 text-gray-700"
                        : item.trangThai === "Đang diễn ra"
                        ? "bg-green-300 text-green-700"
                        : item.trangThai === "Chưa bắt đầu"
                        ? "bg-yellow-300 text-yellow-700"
                        : "bg-red-300 text-red-700"
                    } px-2 py-1 text-sm font-semibold`}
                  >
                    {item.trangThai}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 border border-indigo-500 text-indigo-500 rounded hover:bg-indigo-500 hover:text-white transition duration-300"
                      onClick={() => {
                        navigate(`/manage/khuyen-mai/${item?.id}/edit`);
                      }}
                    >
                      <Edit />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {}}
                    >
                      <Switch />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
