import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Fragment } from "react/jsx-runtime";

interface KhachHangEntity {
  id: number;
  hoTen: string;
  email: string;
  gioiTinh: boolean;
  soDienThoai: string;
  ngaySinh: string;
  diaChiNhan?: {
    diaChi: string;
  };
  trangThai: string;
  provinceId: number;
  districtId: number;
  wardId: number;
}

interface Province {
  Id: number;
  Code: string;
  Name: string;
}

interface District {
  Id: number;
  Code: string;
  Name: string;
  ProvinceId: number;
}

interface Ward {
  Id: number;
  Code: string;
  Name: string;
  DistrictId: number;
}

const FormDiaChi: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [khachHang, setKhachHang] = useState<KhachHangEntity | null>(null);
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
          const response = await axios.get<KhachHangEntity>(
            `/api/khachhang/${id}`
          );
          setKhachHang(response.data);
        } catch (error) {
          console.error("Error fetching customer:", error);
        }
      };
      fetchKhachHang();
    }
  }, [id]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get<Province[]>(
          "https://api.npoint.io/ac646cb54b295b9555be"
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
            "https://api.npoint.io/34608ea16bebc5cffd42"
          );
          const filteredDistricts = response.data.filter(
            (district) => district.ProvinceId === selectedProvince.Id
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
            "https://api.npoint.io/dd278dc276e65c68cdf5"
          );
          const filteredWards = response.data.filter(
            (ward) => ward.DistrictId === selectedDistrict.Id
          );
          setWards(filteredWards);
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      };
      fetchWards();
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (khachHang) {
      const selectedProvince =
        provinces.find((province) => province.Id === khachHang.provinceId) ||
        null;
      setSelectedProvince(selectedProvince);

      const selectedDistrict =
        districts.find((district) => district.Id === khachHang.districtId) ||
        null;
      setSelectedDistrict(selectedDistrict);
    }
  }, [khachHang, provinces, districts]);

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const provinceId = Number(event.target.value);
    const province =
      provinces.find((province) => province.Id === provinceId) || null;
    setSelectedProvince(province);
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const districtId = Number(event.target.value);
    const district =
      districts.find((district) => district.Id === districtId) || null;
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
                  value={khachHang?.hoTen || ""}
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
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
                  value={khachHang?.email || ""}
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
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
                  value={khachHang?.soDienThoai || ""}
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
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
                  value={khachHang?.ngaySinh || ""}
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
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
                    value="Nam"
                    defaultChecked={khachHang?.gioiTinh === true}
                    className="border ml-1 mr-2"
                    required
                  />
                  Nam
                </label>
                <label className="flex items-center mt-2">
                  <input
                    type="radio"
                    name="gioiTinh"
                    value="Nữ"
                    checked={khachHang?.gioiTinh === false}
                    className="border ml-1 mr-2"
                    required
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
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2 ml-5">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Tỉnh/thành phố
              </label>
              <div className="mt-2">
                <select
                  value={selectedProvince?.Id || ""}
                  onChange={handleProvinceChange}
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                  {provinces.map((province) => (
                    <option key={province.Id} value={province.Id}>
                      {province.Name}
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
                  value={selectedDistrict?.Id || ""}
                  onChange={handleDistrictChange}
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                >
                  <option value="">Chọn quận/huyện</option>
                  {districts.map((district) => (
                    <option key={district.Id} value={district.Id}>
                      {district.Name}
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
                  required
                >
                  <option value="">Chọn xã/phường/thị trấn</option>
                  {wards.map((ward) => (
                    <option key={ward.Id} value={ward.Id}>
                      {ward.Name}
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
                    required
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
                    required
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
                    required
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
                    required
                    className="mt-1 p-2 border rounded w-full"
                  >
                    <option value="">Chọn tỉnh/thành phố...</option>
                    {provinces.map((province) => (
                      <option key={province.Id} value={province.Id}>
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
                    required
                    className="mt-1 p-2 border rounded w-full"
                  >
                    <option value="">Chọn quận/huyện...</option>
                    {districts.map((district) => (
                      <option key={district.Id} value={district.Id}>
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
                    required
                    className="mt-1 p-2 border rounded w-full"
                  >
                    <option value="">Chọn xã/phường/thị trấn...</option>
                    {wards.map((ward) => (
                      <option key={ward.Id} value={ward.Id}>
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
      </div>
    </Fragment>
  );
};

export default FormDiaChi;
