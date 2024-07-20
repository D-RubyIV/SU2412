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
import { useState } from "react";
import classNames from "classnames";
import { Button } from "@mui/material";
import moment from "moment";
const LIMIT = 5;
const ITEMS_PER_PAGE = 5;

function TestComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDateStart, setSearchDateStart] = useState("");
  const [searchDateEnd, setSearchDateEnd] = useState("");
  const [searchValue, setSearchValue] = useState<string | number>("");
  const [toggledRows, setToggledRows] = useState<Set<number>>(new Set());
  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["phieuGiamGias", page],
    queryFn: () => getPhieuGiamGias(page, LIMIT),
    placeholderData: keepPreviousData,
  });

  const totalPhieuGiamGiasCount = Number(data?.data.totalElements || 0);
  const totalPage = Math.ceil(totalPhieuGiamGiasCount / LIMIT);

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

  const handleFilter = (data) => {
    let filteredData = [...data]; // Make a copy of data to avoid mutating original

    // Filter by search term
    if (searchTerm.trim() !== "") {
      filteredData = filteredData.filter((item) =>
        item.ma.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by search dates
    if (searchDateStart) {
      filteredData = filteredData.filter((item) =>
        moment(item.thoiGianBatDau).isSameOrAfter(moment(searchDateStart))
      );
    }
    if (searchDateEnd) {
      filteredData = filteredData.filter((item) =>
        moment(item.thoiGianKetThuc).isSameOrBefore(moment(searchDateEnd))
      );
    }

    // Filter by search value (assuming it's a numerical field to compare)
    if (searchValue !== "") {
      filteredData = filteredData.filter(
        (item) => item.someNumericField >= parseInt(searchValue.toString())
      );
    }

    // Filter by status
    switch (status) {
      case "upcoming":
        filteredData = filteredData.filter((item) =>
          moment().isBefore(item.thoiGianBatDau)
        );
        break;
      case "ongoing":
        filteredData = filteredData.filter((item) =>
          moment().isBetween(item.thoiGianBatDau, item.thoiGianKetThuc)
        );
        break;
      case "ended":
        filteredData = filteredData.filter((item) =>
          moment().isAfter(item.thoiGianKetThuc)
        );
        break;
      default:
        break;
    }

    return filteredData;
  };

  const filteredData = data ? handleFilter(data.data.content) : [];

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
              {/* Add filter for status */}
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
                <tbody className="text-sm text-black">
                  {data?.data.content.map((phieuGiamGia, index) => (
                    <tr
                      key={phieuGiamGia.id}
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <td className="py-4 px-6">
                        {(page - 1) * ITEMS_PER_PAGE + index + 1}
                      </td>

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
                        {moment(phieuGiamGia?.thoiGianBatDau).format(
                          "DD/MM/YYYY"
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {moment(phieuGiamGia?.thoiGianKetThuc).format(
                          "DD/MM/YYYY"
                        )}
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
                <ul className="inline-flex items-center -space-x-px">
                  <li>
                    <Link
                      to={`/manage/khuyen-mai/list?page=${page - 1}`}
                      className={classNames(
                        "block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                        {
                          "pointer-events-none opacity-50": page === 1,
                        }
                      )}
                    >
                      Previous
                    </Link>
                  </li>
                  {Array.from({ length: totalPage }).map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <li key={pageNumber}>
                        <Link
                          to={`/manage/khuyen-mai/list?page=${pageNumber}`}
                          className={classNames(
                            "block py-2 px-3 leading-tight border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                            {
                              "text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-white":
                                pageNumber === page,
                            }
                          )}
                        >
                          {pageNumber}
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <Link
                      to={`/manage/khuyen-mai/list?page=${page + 1}`}
                      className={classNames(
                        "block py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                        {
                          "pointer-events-none opacity-50": page === totalPage,
                        }
                      )}
                    >
                      Next
                    </Link>
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
