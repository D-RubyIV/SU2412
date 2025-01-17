// import React, { Fragment, useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// interface Province {
//   Id: number;
//   Code: string;
//   Name: string;
// }

// interface District {
//   Id: number;
//   Code: string;
//   Name: string;
//   ProvinceId: number;
// }

// interface Ward {
//   Id: number;
//   Code: string;
//   Name: string;
//   DistrictId: number;
// }

// const AddKhachHang: React.FC = () => {
//   const [hoTen, setHoTen] = useState("");
//   const [email, setEmail] = useState("");
//   const [soDienThoai, setSoDienThoai] = useState("");
//   const [ngaySinh, setNgaySinh] = useState("");
//   const [diaChiNhan, setDiaChiNhan] = useState("");
//   const [gioiTinh, setGioiTinh] = useState(true); // Mặc định là Nam
//   const [provinces, setProvinces] = useState<Province[]>([]);
//   const [districts, setDistricts] = useState<District[]>([]);
//   const [wards, setWards] = useState<Ward[]>([]);
//   const [selectedProvince, setSelectedProvince] = useState<Province | null>(
//     null
//   );
//   const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
//     null
//   );

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProvinces = async () => {
//       try {
//         const response = await axios.get<Province[]>(
//           "https://api.npoint.io/ac646cb54b295b9555be"
//         );
//         setProvinces(response.data);
//       } catch (error) {
//         console.error("Error fetching provinces:", error);
//       }
//     };
//     fetchProvinces();
//   }, []);

//   useEffect(() => {
//     if (selectedProvince) {
//       const fetchDistricts = async () => {
//         try {
//           const response = await axios.get<District[]>(
//             "https://api.npoint.io/34608ea16bebc5cffd42"
//           );
//           const filteredDistricts = response.data.filter(
//             (district) => district.ProvinceId === selectedProvince.Id
//           );
//           setDistricts(filteredDistricts);
//         } catch (error) {
//           console.error("Error fetching districts:", error);
//         }
//       };
//       fetchDistricts();
//     }
//   }, [selectedProvince]);

//   useEffect(() => {
//     if (selectedDistrict) {
//       const fetchWards = async () => {
//         try {
//           const response = await axios.get<Ward[]>(
//             "https://api.npoint.io/dd278dc276e65c68cdf5"
//           );
//           const filteredWards = response.data.filter(
//             (ward) => ward.DistrictId === selectedDistrict.Id
//           );
//           setWards(filteredWards);
//         } catch (error) {
//           console.error("Error fetching wards:", error);
//         }
//       };
//       fetchWards();
//     }
//   }, [selectedDistrict]);

//   const handleProvinceChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const provinceId = Number(event.target.value);
//     const province =
//       provinces.find((province) => province.Id === provinceId) || null;
//     setSelectedProvince(province);
//     setSelectedDistrict(null); // Reset selected district when province changes
//   };

//   const handleDistrictChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const districtId = Number(event.target.value);
//     const district =
//       districts.find((district) => district.Id === districtId) || null;
//     setSelectedDistrict(district);
//   };

//   const handleGioiTinhChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setGioiTinh(event.target.value === "Nam");
//   };
//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();

//     const formattedNgaySinh = new Date(ngaySinh).toISOString();

//     const newCustomer = {
//       hoTen,
//       email,
//       soDienThoai,
//       ngaySinh: formattedNgaySinh,
//       diaChiNhan: {
//         diaChi: diaChiNhan,
//       },
//       gioiTinh,
//       selectedProvince,
//       selectedDistrict,
//     };

//     axios
//       .post("http://localhost:8080/api/khachhang", newCustomer)
//       .then((response) => {
//         navigate("/manage/khach-hang", {
//           state: { newCustomer: response.data },
//         });
//       })
//       .catch((error) => console.error("Error adding customer:", error));
//   };

//   return (
//     <Fragment>
//       <form onSubmit={handleSubmit}>
//         <div className="space-y-3 bg-white border border-gray-300 rounded-md shadow-md border-r pr-4">
//           <h2 className="text-2xl font-bold mt-5 ml-5">Thông tin khách hàng</h2>
//           <hr className="border-gray-500 ml-3" />

//           <div className="border-b border-gray-900/10 pb-12">
//             <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//               <div className="sm:col-span-2 ml-5">
//                 <label className="block text-sm font-medium leading-6 text-gray-900">
//                   Tên khách hàng
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="text"
//                     value={hoTen}
//                     onChange={(e) => setHoTen(e.target.value)}
//                     placeholder="Nhập tên khách hàng"
//                     style={{ paddingLeft: "10px" }}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="sm:col-span-2 ml-5">
//                 <label className="block text-sm font-medium leading-6 text-gray-900">
//                   Email
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Nhập email"
//                     style={{ paddingLeft: "10px" }}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="sm:col-span-2 ml-5">
//                 <label className="block text-sm font-medium leading-6 text-gray-900">
//                   Số điện thoại
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="tel"
//                     value={soDienThoai}
//                     onChange={(e) => setSoDienThoai(e.target.value)}
//                     placeholder="Nhập số điện thoại"
//                     style={{ paddingLeft: "10px" }}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//               <div className="sm:col-span-2 ml-5">
//                 <label className="block text-sm font-medium leading-6 text-gray-900">
//                   Ngày sinh
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="date"
//                     style={{ paddingLeft: "10px" }}
//                     value={ngaySinh}
//                     onChange={(e) => setNgaySinh(e.target.value)}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="sm:col-span-2 ml-5">
//                 <label className="block text-sm font-medium leading-6 text-gray-900">
//                   Giới tính
//                 </label>
//                 <div className="flex items-center space-x-4">
//                   <label className="flex items-center mt-2">
//                     <input
//                       type="radio"
//                       name="gioiTinh"
//                       value="Nam"
//                       checked={gioiTinh === true}
//                       onChange={handleGioiTinhChange}
//                       className="border ml-1 mr-2"
//                       required
//                     />
//                     Nam
//                   </label>
//                   <label className="flex items-center mt-2">
//                     <input
//                       type="radio"
//                       name="gioiTinh"
//                       value="Nữ"
//                       checked={gioiTinh === false}
//                       onChange={handleGioiTinhChange}
//                       className="border ml-1 mr-2"
//                       required
//                     />
//                     Nữ
//                   </label>
//                 </div>
//               </div>
//               <div className="sm:col-span-2 ml-5">
//                 <label className="block text-sm font-medium leading-6 text-gray-900">
//                   Địa chỉ cụ thể
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     type="text"
//                     value={diaChiNhan}
//                     onChange={(e) => setDiaChiNhan(e.target.value)}
//                     placeholder="Nhập địa chỉ nhận hàng"
//                     style={{ paddingLeft: "10px" }}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="sm:col-span-2 ml-5">
//                 <label className="block text-sm font-medium leading-6 text-gray-900">
//                   Tỉnh/thành phố
//                 </label>
//                 <div className="mt-2">
//                   <select
//                     value={selectedProvince?.Id || ""}
//                     onChange={handleProvinceChange}
//                     style={{ paddingLeft: "10px" }}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     required
//                   >
//                     <option value="">Chọn tỉnh/thành phố</option>
//                     {provinces.map((province) => (
//                       <option key={province.Id} value={province.Id}>
//                         {province.Name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <div className="sm:col-span-2 ml-5">
//                 <label className="block text-sm font-medium leading-6 text-gray-900">
//                   Quận/huyện
//                 </label>
//                 <div className="mt-2">
//                   <select
//                     value={selectedDistrict?.Id || ""}
//                     onChange={handleDistrictChange}
//                     style={{ paddingLeft: "10px" }}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     required
//                   >
//                     <option value="">Chọn quận/huyện</option>
//                     {districts.map((district) => (
//                       <option key={district.Id} value={district.Id}>
//                         {district.Name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="sm:col-span-2 ml-5">
//                 <label className="block text-sm font-medium leading-6 text-gray-900">
//                   Xã/phường/thị trấn
//                 </label>
//                 <div className="mt-2">
//                   <select
//                     style={{ paddingLeft: "10px" }}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     required
//                   >
//                     <option value="">Chọn xã/phường/thị trấn</option>
//                     {wards.map((ward) => (
//                       <option key={ward.Id} value={ward.Id}>
//                         {ward.Name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 flex items-center justify-end gap-x-6">
//               <button
//                 type="button"
//                 onClick={() => navigate("/manage/khach-hang")}
//                 className="text-sm font-semibold leading-6 text-gray-900"
//               >
//                 Hủy
//               </button>
//               <button
//                 type="submit"
//                 className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
//               >
//                 Lưu
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </Fragment>
//   );
// };

// export default AddKhachHang;
