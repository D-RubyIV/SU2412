import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Fragment } from "react/jsx-runtime";
import { KhachHang } from "./entity/KhachHang";
import { DiaChiNhan } from "./entity/DiaChiNhan";
import { Province } from "./entity/Province";
import { District } from "./entity/District";
import { Ward } from "./entity/Ward";

const UpdateKH: React.FC = () => {
  const { id } = useParams();

  const initialDiaChiNhan: DiaChiNhan = {
    id: 0,
    diaChi: "",
    tenNguoiNhan: "",
    soDienThoaiNhan: "",
  };

  const initialCustomer: KhachHang = {
    id: 0,
    ma: "",
    email: "",
    password: "",
    gioiTinh: true,
    soDienThoai: "",
    hoTen: "",
    ngaySinh: "",
    trangThai: "active",
    diaChiNhan: initialDiaChiNhan,
  };

  const [khachHang, setKhachHang] = useState<KhachHang>(initialCustomer);
  const [showForm, setShowForm] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );

  useEffect(() => {
    if (id) {
      const fetchKhachHang = async () => {
        try {
          const response = await axios.get<KhachHang>(
            `http://localhost:8080/api/khachhang/${id}`
          );
          setKhachHang(response.data);
        } catch (error) {
          console.error("Error fetching customer:", error);
        }
      };
      fetchKhachHang();
    }
  }, [id]);

  const getFormattedDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Thêm '0' để luôn có 2 chữ số cho tháng
    const day = ("0" + date.getDate()).slice(-2); // Thêm '0' để luôn có 2 chữ số cho ngày
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | { name?: any; value: any }>
  ) => {
    const { name, value } = e.target;
    setKhachHang({ ...khachHang, [name]: value });
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get<Province[]>(
          "http://localhost:8080/api/province"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get<District[]>(
            `http://localhost:8080/api/district`
          );
          const filteredDistricts = response.data.filter(
            (district) => district.province.id === selectedProvince.id
          );
          setDistricts(filteredDistricts);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };
      fetchDistricts();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const response = await axios.get<Ward[]>(
            `http://localhost:8080/api/ward}`
          );
          const filteredWards = response.data.filter(
            (ward) => ward.district.id === selectedDistrict.id
          );
          setWards(filteredWards);
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      };
      fetchWards();
    }
  }, [selectedDistrict]);

  // useEffect(() => {
  //   if (khachHang) {
  //     const selectedProvince =
  //       provinces.find((province) => province.id === khachHang.province?.id) ||
  //       null;
  //     setSelectedProvince(selectedProvince);

  //     const selectedDistrict =
  //       districts.find((district) => district.id === ) ||
  //       null;
  //     setSelectedDistrict(selectedDistrict);
  //   }
  // }, [khachHang, provinces, districts]);

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const provinceid = Number(event.target.value);
    const province =
      provinces.find((province) => province.id === provinceid) || null;
    setSelectedProvince(province);
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const districtid = Number(event.target.value);
    const district =
      districts.find((district) => district.id === districtid) || null;
    setSelectedDistrict(district);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <Fragment>
      <div className=" mx-auto overflow-auto border border-gray-300 rounded-md shadow-md pl-3 bg-white">
        <h2 className="text-2xl font-bold mb-4 mt-2">Thông tin địa chỉ</h2>
        <hr className="border-gray-500 mr-4" />

        <div className="border-b border-gray-900/10 mr-6">
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 ml-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Tên khách hàng
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Nhập tên khách hàng"
                  value={khachHang.hoTen}
                  onChange={handleInputChange}
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2 ml-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  placeholder="Nhập email"
                  value={khachHang.email}
                  onChange={handleInputChange}
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2 ml-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Số điện thoại
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={khachHang.soDienThoai}
                  onChange={handleInputChange}
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 ml-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Ngày sinh
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  value={getFormattedDate(new Date(khachHang.ngaySinh))}
                  onChange={handleInputChange}
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2 ml-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Giới tính
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center mt-2">
                  <input
                    type="radio"
                    name="gioiTinh"
                    value="true"
                    checked={khachHang.gioiTinh === true}
                    onChange={handleInputChange}
                    className="border ml-1 mr-2"
                  />
                  Nam
                </label>
                <label className="flex items-center mt-2">
                  <input
                    type="radio"
                    name="gioiTinh"
                    value="false"
                    checked={khachHang.gioiTinh === false}
                    onChange={handleInputChange}
                    className="border ml-1 mr-2"
                  />
                  Nữ
                </label>
              </div>
            </div>
            <div className="sm:col-span-2 ml-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Địa chỉ cụ thể
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Nhập địa chỉ nhận hàng"
                  value={khachHang.diaChiNhan?.diaChi}
                  onChange={handleInputChange}
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2 ml-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Tỉnh/thành phố
              </label>
              <div className="mt-2">
                <select
                  value={selectedProvince?.id || ""}
                  onChange={handleProvinceChange}
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-2 ml-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Quận/huyện
              </label>
              <div className="mt-2">
                <select
                  value={selectedDistrict?.id || ""}
                  onChange={handleDistrictChange}
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Chọn quận/huyện</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2 ml-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Xã/phường/thị trấn
              </label>
              <div className="mt-2">
                <select
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Chọn xã/phường/thị trấn</option>
                  {wards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Cập nhật
            </button>
          </div>
        </div>
        {
          <div className="p-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={toggleForm}
            >
              Tạo địa chỉ mới
            </button>
            {showForm && (
              <form>
                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-2 ml-5">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Tên
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập tên người nhận..."
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                  <div className="sm:col-span-2 ml-5">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập số điện thoại..."
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                  <div className="sm:col-span-2 ml-5">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Địa chỉ cụ thể
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập địa chỉ cụ thể..."
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-2 ml-5">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Tỉnh/thành phố
                    </label>
                    <select
                      onChange={handleProvinceChange}
                      className="mt-1 p-2 border rounded w-full"
                    >
                      <option value="">Chọn tỉnh/thành phố...</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2 ml-5">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Quận/huyện
                    </label>
                    <select
                      onChange={handleDistrictChange}
                      disabled={!selectedProvince}
                      className="mt-1 p-2 border rounded w-full"
                    >
                      <option value="">Chọn quận/huyện...</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2 ml-5">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Xã/phường/thị trấn
                    </label>
                    <select
                      disabled={!selectedDistrict}
                      className="mt-1 p-2 border rounded w-full"
                    >
                      <option value="">Chọn xã/phường/thị trấn...</option>
                      {wards.map((ward) => (
                        <option key={ward.id} value={ward.id}>
                          {ward.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  >
                    Thêm
                  </button>
                </div>
              </form>
            )}
          </div>
        }
      </div>
    </Fragment>
  );
};

export default UpdateKH;
