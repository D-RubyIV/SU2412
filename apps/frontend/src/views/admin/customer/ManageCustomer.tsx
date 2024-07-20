// import { useEffect, useState } from "react";
// import { Fragment } from "react/jsx-runtime";
// import { useLocation, useNavigate } from "react-router-dom";
// import KhachHangEntity from "../../../entity/KhachHang";
// import axios from "axios";
// import ListKhacHang from "./ListKhachHang";

// const ManageCustomer = () => {
//   const [khachHangList, setKhachHangList] = useState<KhachHangEntity[]>([]);
//   const [searchValue, setSearchValue] = useState<string>("");
//   const [selectedTrangThai, setSelectedTrangThai] = useState<string>("all");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const newCustomer = location.state?.newCustomer;

//   useEffect(() => {
//     fetchListKhachHang();
//   }, []);

//   useEffect(() => {
//     if (newCustomer) {
//       setKhachHangList((prevList) => [newCustomer, ...prevList]);
//     }
//   }, [newCustomer]);

//   const fetchListKhachHang = () => {
//     axios
//       .get("http://localhost:8080/api/khachhang")
//       .then((response) => {
//         setKhachHangList(response.data);
//       })
//       .catch((error) => {
//         console.error("Lỗi khi tải danh sách khách hàng: ", error);
//       });
//   };

//   /* tìm kiếm */
//   const handleSearch = () => {
//     const params: { keyword?: string; trangThai?: string } = {};
//     if (searchValue) params.keyword = searchValue;
//     if (selectedTrangThai !== "all") params.trangThai = selectedTrangThai;

//     axios
//       .get("http://localhost:8080/api/khachhang/search", { params })
//       .then((response) => {
//         setKhachHangList(response.data);
//         setSearchValue("");
//       })
//       .catch((error) => {
//         console.error("Lỗi khi tìm kiếm khách hàng: ", error);
//       });
//   };

//   /* loc theo trangThai */
//   const handleTrangThaiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedTrangThai(e.target.value);
//     const params: { keyword?: string; trangThai?: string } = {};
//     if (searchValue) params.keyword = searchValue;
//     if (e.target.value !== "all") params.trangThai = e.target.value;

//     axios
//       .get("http://localhost:8080/api/khachhang/search", { params })
//       .then((response) => {
//         setKhachHangList(response.data);
//       })
//       .catch((error) => {
//         console.error("Lỗi khi tìm kiếm khách hàng: ", error);
//       });
//   };

//   // /* xóa */
//   const deleteKhachHang = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/khachhang/${id}`);
//       const newKhachHangList = khachHangList.filter((kh) => kh.id !== id);
//       setKhachHangList(newKhachHangList);
//     } catch (error) {
//       console.error("Lỗi khi xóa khách hàng: ", error);
//     }
//   };

//   const handleAddCustomerClick = () => {
//     navigate("/manage/add-customer");
//   };

//   return (
//     <Fragment>
//       <h1 className="text-3xl font-bold mb-4">Quản lý tài khoản khách hàng</h1>

//       {/* Bộ lọc */}
//       <div className="overflow-auto border border-gray-300 rounded-md shadow-md bg-white">
//         <div className="border-b px-4">
//           <h1 className="text-2xl font-bold">Bộ lọc</h1>
//           <hr className="border-gray-500" />

//           <div className="p-9">
//             <div className="flex gap-4 mt-3 items-center">
//               <label className="text-sl font-bold whitespace-nowrap">
//                 Tìm kiếm:
//               </label>
//               <input
//                 type="text"
//                 placeholder="Tìm kiếm tên và số điện thoại..."
//                 className="border ml-1 p-2 rounded basis-1/4 me-48 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={searchValue}
//                 onChange={(e) => setSearchValue(e.target.value)}
//               />
//               <label className="text-sl font-bold whitespace-nowrap">
//                 Ngày sinh:
//               </label>
//               <input
//                 type="date"
//                 className="border p-2 rounded flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//               <input
//                 type="date"
//                 className="border p-2 rounded flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//             <div className="flex gap-4 mt-8 items-center">
//               <label className="text-sl font-bold whitespace-nowrap ">
//                 Trạng thái:
//               </label>
//               <select
//                 className="border p-2 rounded basis-1/4 me-48 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 style={{ width: "25%" }}
//                 value={selectedTrangThai}
//                 onChange={handleTrangThaiChange}
//               >
//                 <option value="all">Tất cả</option>
//                 <option value="active">Kích hoạt</option>
//                 <option value="inactive">Đã kích hoạt</option>
//               </select>
//               <button
//                 style={{ backgroundColor: "#606dbc" }}
//                 className=" text-white px-4 py-2 rounded"
//                 onClick={handleSearch}
//               >
//                 Tìm kiếm
//               </button>
//               <button
//                 style={{ backgroundColor: "#606dbc" }}
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//                 onClick={fetchListKhachHang}
//               >
//                 Làm mới bộ lọc
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Danh sách khách hàng */}
//       <div className="flex justify-between items-center mb-2 mt-4">
//         <h2 className="text-lg font-bold">Danh sách khách hàng</h2>
//         <button
//           style={{ backgroundColor: "#606dbc" }}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={handleAddCustomerClick}
//         >
//           + Thêm
//         </button>
//       </div>

//       <div className="mt-4">
//         <div className="overflow-auto max-h-[370px] border border-gray-300 rounded-md shadow-md">
//           <table className="table-auto md:table-fixed w-full text-sm">
//             <thead className="sticky top-0 bg-gray-200 z-50">
//               <tr className="text-left">
//                 <th className="border p-2">STT</th>
//                 {/* <th className="border p-2">Mã khách hàng</th> */}
//                 <th className="border p-2">Tên khách hàng</th>
//                 <th className="border p-2">Email</th>
//                 <th className="border p-2">Số điện thoại</th>
//                 <th className="border p-2">Ngày sinh</th>
//                 <th className="border p-2">Địa chỉ</th>
//                 <th className="border p-2">Trạng Thái</th>
//                 <th className="border p-2">Thao tác</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {khachHangList.map((khachHang, index) => (
//                 <ListKhacHang
//                   key={khachHang.id}
//                   khachHang={khachHang}
//                   index={index + 1}
//                   onDelete={deleteKhachHang}
//                 />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ManageCustomer;
