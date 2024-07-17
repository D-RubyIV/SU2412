import { Fragment } from "react/jsx-runtime";
import { useQueryString } from "../../../utils/utils";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  deletePhieuGiamGia,
  getPhieuGiamGias,
} from "../../../apis/phieugiamgia.api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEdit, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Button } from "@mui/material";
const LIMIT = 10;

function TestComponent() {
  const [filteredTodos, setFilteredTodos] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDateStart, setSearchDateStart] = useState("");
  const [searchDateEnd, setSearchDateEnd] = useState("");
  const [searchValue, setSearchValue] = useState<string | number>("");
  //   const [isToggled, setIsToggled] = useState(false);
  const [toggledRows, setToggledRows] = useState<Set<number>>(new Set());
  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["phieuGiamGias", page],
    queryFn: () => getPhieuGiamGias(page, LIMIT),
    placeholderData: keepPreviousData,
  });
  const totalPhieuGiamGiasCount = Number(data?.headers["x-total-count"] || 0);
  const totalPage = Math.ceil(totalPhieuGiamGiasCount / 10);

  // const deletePhieuGiamGiaMutation = useMutation({
  //   mutationFn: (id: number | string) => deletePhieuGiamGia(id),
  //   onSuccess: (_, id) => {
  //     toast.success(`Xóa thành công Phiếu Giảm Giá với id là ${id}`);
  //   },
  // });

  // const handleToggle = (id: number) => {
  //   const updatedRows = new Set(toggledRows);
  //   if (updatedRows.has(id)) {
  //     deletePhieuGiamGiaMutation.mutate(id, {
  //       onSuccess: () => {
  //         toast.success(`Xóa thành công Phiếu Giảm Giá với id là ${id}`);
  //         setToggledRows((prev) => {
  //           const newSet = new Set(prev);
  //           newSet.delete(id);
  //           return newSet;
  //         });
  //       },
  //     });
  //   } else {
  //     updatedRows.add(id);
  //     setToggledRows(updatedRows);
  //   }
  // };
  const deletePhieuGiamGiaMutation = useMutation({
    mutationFn: (id) => deletePhieuGiamGia(id),
    onSuccess: (_, id) => {
      toast.success(`Xóa thành công Phiếu Giảm Giá với id là ${id}`);
      // Update state after successful delete
      setToggledRows((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      // Refetch data to update the list
      refetch();
    },
  });

  const handleToggle = (id) => {
    if (toggledRows.has(id)) {
      // If row is toggled on, delete it immediately
      deletePhieuGiamGiaMutation.mutate(id);
    } else {
      // Toggle row on
      setToggledRows((prev) => new Set(prev.add(id)));
    }
  };

  const handleSearch = () => {
    let filtered = data?.data || [];

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
      const searchNumber = Number(searchValue);
      filtered = filtered.filter(
        (item) => item.tongTienToiThieu >= searchNumber
      );
    }

    if (status !== "all") {
      filtered = filtered.filter((item) => item.trangThai === status);
    }

    setFilteredTodos(filtered);
  };

  useEffect(() => {
    if (data?.data) {
      handleSearch();
    }
  }, [
    data?.data,
    searchTerm,
    searchDateStart,
    searchDateEnd,
    searchValue,
    status,
  ]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, searchDateStart, searchDateEnd, searchValue]);

  return (
    <Fragment>
      <div>
        <h1 className="text-lg">Phiếu Giảm Giá</h1>
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
        {isLoading && (
          <div role="status" className="mt-6 animate-pulse">
            <div className="mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-10  rounded bg-gray-200 dark:bg-gray-700" />
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {!isLoading && (
          <Fragment>
            <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
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
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.map((phieuGiamGia, index) => (
                    <tr
                      key={phieuGiamGia.id}
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <td className="py-4 px-6">{index + 1}</td>

                      <th
                        scope="row"
                        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                      >
                        {phieuGiamGia.ma}
                      </th>
                      <td className="py-4 px-6">{phieuGiamGia.ten}</td>
                      <td className="py-4 px-6">{phieuGiamGia.loaiPhieu}</td>
                      <td className="py-4 px-6">{phieuGiamGia.soLuong}</td>
                      <td className="py-4 px-6">
                        {phieuGiamGia.tongTienToiThieu}
                      </td>
                      <td className="py-4 px-6">
                        {phieuGiamGia.thoiGianBatDau}
                      </td>
                      <td className="py-4 px-6">
                        {phieuGiamGia.thoiGianKetThuc}
                      </td>
                      <td className="px-4 py-6">
                        <span
                          className={`inline-block whitespace-nowrap rounded-full px-2 py-1 text-sm font-semibold
  ${
    phieuGiamGia.trangThai === "Đã kết thúc"
      ? "bg-gray-200 text-gray-700"
      : phieuGiamGia.trangThai === "Ðang di?n ra"
      ? "bg-green-200 text-green-700"
      : phieuGiamGia.trangThai === "Chua b?t d?u"
      ? "bg-yellow-200 text-green-700"
      : "bg-blue-200 text-red-700"
  }`}
                        >
                          {phieuGiamGia.trangThai}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right flex items-center justify-end">
                        <Link
                          to={`/manage/khuyen-mai/${phieuGiamGia.id}`}
                          className="mr-5 font-medium text-light-blue-300 hover:underline dark:text-blue-500"
                        >
                          <FaEdit size={24} />
                        </Link>
                        <button
                          className={classNames(
                            "font-medium p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-700 flex items-center justify-center",
                            toggledRows.has(phieuGiamGia.id)
                              ? "text-red-600 dark:text-red-500"
                              : "text-gray-600 dark:text-gray-400"
                          )}
                          onClick={() => handleToggle(phieuGiamGia.id)}
                          style={{ width: "40px", height: "40px" }} // Ensure the button has a fixed size
                        >
                          {toggledRows.has(phieuGiamGia.id) ? (
                            <FaToggleOn size={24} />
                          ) : (
                            <FaToggleOff size={24} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-center">
              <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                  <li>
                    {page === 1 ? (
                      <span className="cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ">
                        Previous
                      </span>
                    ) : (
                      <Link
                        className="rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                        to={`/students?page=${page - 1}`}
                      >
                        Previous
                      </Link>
                    )}
                  </li>
                  {Array(totalPage)
                    .fill(0)
                    .map((_, index) => {
                      const pageNumber = index + 1;
                      const isActive = page === pageNumber;
                      return (
                        <li key={pageNumber}>
                          <Link
                            className={classNames(
                              "border border-gray-300   py-2 px-3 leading-tight  hover:bg-gray-100 hover:text-gray-700 ",
                              {
                                "bg-gray-100 text-gray-700": isActive,
                                "bg-white text-gray-500": !isActive,
                              }
                            )}
                            to={`/students?page=${pageNumber}`}
                          >
                            {pageNumber}
                          </Link>
                        </li>
                      );
                    })}
                  <li>
                    {page === totalPage ? (
                      <span className="cursor-not-allowed rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ">
                        Next
                      </span>
                    ) : (
                      <Link
                        className="rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                        to={`/students?page=${page + 1}`}
                      >
                        Next
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default TestComponent;
