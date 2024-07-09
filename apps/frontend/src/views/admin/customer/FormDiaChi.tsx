// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useForm, SubmitHandler } from "react-hook-form";

import { Fragment } from "react/jsx-runtime";

// type DuLieuFormDiaChi = {
//   ten: string;
//   soDienThoai: string;
//   diaChiCuThe: string;
//   tinhThanhPho: string;
//   quanHuyen: string;
//   xaPhuongThiTran: string;
// };

// type TinhThanhPho = {
//   Id: number;
//   Code: string;
//   Name: string;
// };

// type QuanHuyen = {
//   Id: number;
//   Code: string;
//   Name: string;
// };

// type XaPhuongThiTran = {
//   Id: number;
//   Code: string;
//   Name: string;
// };

const FormDiaChi: React.FC = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm<DuLieuFormDiaChi>();
  // const [tinhThanhPho, setTinhThanhPho] = useState<TinhThanhPho[]>([]);
  // const [quanHuyen, setQuanHuyen] = useState<QuanHuyen[]>([]);
  // const [xaPhuongThiTran, setXaPhuongThiTran] = useState<XaPhuongThiTran[]>([]);
  // const [tinhThanhPhoChon, setTinhThanhPhoChon] = useState<string>("");
  // const [quanHuyenChon, setQuanHuyenChon] = useState<string>("");

  // useEffect(() => {
  //   axios
  //     .get<TinhThanhPho[]>("https://api.npoint.io/ac646cb54b295b9555be")
  //     .then((response) => setTinhThanhPho(response.data))
  //     .catch((error) => console.error(error));
  // }, []);

  // const handleTinhThanhPhoChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const maTinhThanhPho = e.target.value;
  //   setTinhThanhPhoChon(maTinhThanhPho);
  //   setQuanHuyenChon("");
  //   setXaPhuongThiTran([]);
  //   axios
  //     .get<QuanHuyen[]>(`https://api.npoint.io/34608ea16bebc5cffd42`)
  //     .then((response) => {
  //       const districts = response.data.filter((district) =>
  //         district.Code.startsWith(maTinhThanhPho)
  //       );
  //       setQuanHuyen(districts);
  //     })
  //     .catch((error) => console.error(error));
  //   reset({ quanHuyen: "", xaPhuongThiTran: "" });
  // };

  // const handleQuanHuyenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const maQuanHuyen = e.target.value;
  //   setQuanHuyenChon(maQuanHuyen);
  //   axios
  //     .get<XaPhuongThiTran[]>(`https://api.npoint.io/dd278dc276e65c68cdf5`)
  //     .then((response) => {
  //       const wards = response.data.filter((ward) =>
  //         ward.Code.startsWith(maQuanHuyen)
  //       );
  //       setXaPhuongThiTran(wards);
  //     })
  //     .catch((error) => console.error(error));
  //   reset({ xaPhuongThiTran: "" });
  // };

  // const onSubmit: SubmitHandler<DuLieuFormDiaChi> = (data) => {
  //   console.log(data);
  // };

  return (
    <Fragment>
      <div className="flex mx-auto overflow-auto border border-gray-300 rounded-md shadow-md mt-3 p-4">
        {/* Bên trái - chiếm 1/4 */}
        <div className="w-1/4 border-r pr-4">
          <h2 className="text-2xl font-bold mb-4 mt-2">Thêm Khách Hàng</h2>
          <hr className="border-gray-500" />
          <form className="space-y-2 mt-1">
            <div>
              <label className="block text-sl font-bold whitespace-nowrap mb-2">
                Tên khách hàng:
              </label>
              <input
                type="text"
                placeholder="Tên khách hàng"
                className="border p-2 rounded w-full"
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
                required
              />
            </div>
            <div>
              <label className="block text-sl font-bold whitespace-nowrap mb-2">
                Trạng thái:
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
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

        {/* Bên phải - chiếm 3/4 */}
        <div className="w-3/4 pl-4">
          <h2 className="text-2xl font-bold mb-4 mt-2">Thêm Khách Hàng</h2>
          <hr className="border-gray-500" />
          <form className="space-y-2 mt-1">
            <div>
              <label className="block text-sl font-bold whitespace-nowrap mb-2">
                Tên khách hàng:
              </label>
              <input
                type="text"
                placeholder="Tên khách hàng"
                className="border p-2 rounded w-full"
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
                required
              />
            </div>
            <div>
              <label className="block text-sl font-bold whitespace-nowrap mb-2">
                Trạng thái:
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
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
    </Fragment>
  );
};

export default FormDiaChi;
