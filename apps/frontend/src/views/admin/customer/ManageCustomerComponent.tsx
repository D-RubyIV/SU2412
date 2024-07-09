// import { useState } from "react";
// import ListCustomer from "./CustomerList";
// import KhachHangEntity from "../../../entity/KhachHang";

// function ManageCustomerComponent() {
//   const [customers, setCustomers] = useState<KhachHangEntity[]>([]);
//   const [tenKhachHang, setTenKhachHang] = useState<string>("");
//   const [cccd, setcccd] = useState<string>("");
//   const [soDienThoai, setsoDienThoai] = useState<string>("");
//   const [ngaySinh, setngaySinh] = useState<Date | null>(null);
//   const [trangThai, setTrangThai] = useState<boolean>(true);
//   const [errors, setErrors] = useState<any>({});

//   const addCustomer = () => {
//     let newErrors: any = {};

//     if (!tenKhachHang) newErrors.tenKhachHang = "Vui lòng nhập tên khách hàng";
//     if (cccd.length !== 12 || !/^\d+$/.test(cccd))
//       newErrors.cccd = "CCCD phải có đúng 12 chữ số";
//     if (soDienThoai.length !== 10 || !/^0\d{9}$/.test(soDienThoai))
//       newErrors.soDienThoai = "Số điện thoại đủ 10 số";
//     if (!ngaySinh) newErrors.ngaySinh = "Vui lòng nhập ngày sinh";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//     } else {
//       const khachHangMoi = new Customer(
//         customers.length + 1,
//         tenKhachHang,
//         cccd,
//         soDienThoai,
//         ngaySinh as Date,
//         trangThai
//       );
//       setCustomers([...customers, khachHangMoi]);
//       // Đặt lại các trường nhập liệu sau khi thêm
//       setTenKhachHang("");
//       setcccd("");
//       setsoDienThoai("");
//       setngaySinh(null);
//       setTrangThai(true);
//       setErrors({});
//     }
//   };

//   return (
//     <div>
//       <div>
//         <label style={{ fontWeight: "bold" }}>Tên khách hàng</label>
//         <input
//           type="text"
//           placeholder="Nhập tên khách hàng"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           value={tenKhachHang}
//           onChange={(e) => setTenKhachHang(e.target.value)}
//         />
//         {errors.tenKhachHang && (
//           <span className="text-red-500">{errors.tenKhachHang}</span>
//         )}
//       </div>

//       <div className="mt-3">
//         <label style={{ fontWeight: "bold" }}>CCCD</label>
//         <input
//           type="number"
//           placeholder="Nhập tên cccd"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           value={cccd}
//           onChange={(e) => setcccd(e.target.value)}
//           maxLength={12}
//         />
//         {errors.cccd && <span className="text-red-500">{errors.cccd}</span>}
//       </div>

//       <div className="mt-3">
//         <label style={{ fontWeight: "bold" }}>Số điện thoại</label>
//         <input
//           type="text"
//           placeholder="Nhập số điện thoại"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           value={soDienThoai || ""}
//           onChange={(e) => setsoDienThoai(e.target.value)}
//         />
//         {errors.soDienThoai && (
//           <span className="text-red-500">{errors.soDienThoai}</span>
//         )}
//       </div>

//       <div className="mt-3">
//         <label style={{ fontWeight: "bold" }}>Ngày sinh</label>
//         <input
//           type="date"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           value={ngaySinh ? ngaySinh.toISOString().split("T")[0] : ""}
//           onChange={(e) =>
//             setngaySinh(e.target.value ? new Date(e.target.value) : null)
//           }
//         />
//         {errors.ngaySinh && (
//           <span className="text-red-500">{errors.ngaySinh}</span>
//         )}
//       </div>

//       <div className="mt-3">
//         <label style={{ fontWeight: "bold" }}>Trạng thái</label>
//         <label style={{ marginLeft: "10px" }}>
//           <input
//             type="radio"
//             name="trangThai"
//             value="true"
//             checked={trangThai === true}
//             onChange={() => setTrangThai(true)}
//           />
//           Hoạt động
//         </label>
//         <label className="p-2">
//           <input
//             type="radio"
//             name="trangThai"
//             value="false"
//             checked={trangThai === false}
//             onChange={() => setTrangThai(false)}
//           />
//           Không hoạt động
//         </label>
//       </div>

//       <button
//         onClick={addCustomer}
//         className="w-100 py-2 px-4 mt-3 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//       >
//         Add Customer
//       </button>

//       <h1 className="mt-2">Danh sách khách hàng</h1>
//       <div className="w-[100%] h-[30vh] overflow-y-auto border border-gray-300 rounded-md shadow-md mt-2">
//         <table className="table-auto md:table-fixed w-full text-sm">
//           <thead className="sticky top-0 bg-gray-200 z-50">
//             <tr className="text-left">
//               <th className="px-4 py-2">STT</th>
//               <th className="px-4 py-2">ID</th>
//               <th className="px-4 py-2">CCCD</th>
//               <th className="px-4 py-2">Số điện thoại</th>
//               <th className="px-4 py-2">Ngày sinh</th>
//               <th className="px-4 py-2">Trạng thái</th>
//               <th className="px-4 py-2">Hành động</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {customers.map((customer) => (
//               <ListCustomer key={customer.id} khachHang={customer} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ManageCustomerComponent;
