import { Fragment } from "react/jsx-runtime";

const ManageVoucherComponent = () => {
  return (
    <Fragment>
      <div className="w-[100%] h-[85vh] mx-auto p-6 bg-white rounded-lg shadow-xl overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700">
          Phiếu giảm giá
        </h2>
        <h1 className="text-xl font-semibold mb-6 text-indigo-600">
          Thêm mới phiếu giảm giá
        </h1>
        <form name="phieuGiamGiaForm">
          {/* Mã phiếu giảm giá */}
          <div className="form-group mb-4">
            <label
              htmlFor="maPhieu"
              className="block text-sm font-medium text-gray-700"
            >
              Mã phiếu :
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="maPhieu"
              name="maGiamGia"
              maxLength={10}
              required
            />
          </div>

          {/* Giá trị giảm */}
          <div className="form-group mb-4">
            <label
              htmlFor="phanTramGiam"
              className="block text-sm font-medium text-gray-700"
            >
              Giá trị giảm
            </label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="phanTramGiam"
              name="phanTramGiam"
              required
            />
          </div>

          {/* Ngày bắt đầu và Ngày kết thúc */}
          <div className="flex space-x-4 mb-4">
            <div className="form-group w-1/2">
              <label
                htmlFor="ngayBatDau"
                className="block text-sm font-medium text-gray-700"
              >
                Ngày bắt đầu
              </label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="ngayBatDau"
                name="ngayBatDau"
                required
              />
            </div>
            <div className="form-group w-1/2">
              <label
                htmlFor="ngayKetThuc"
                className="block text-sm font-medium text-gray-700"
              >
                Ngày kết thúc
              </label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="ngayKetThuc"
                name="ngayKetThuc"
                required
              />
            </div>
          </div>

          {/* Số lượng phiếu và Giá trị đơn tối thiểu */}
          <div className="flex space-x-4 mb-4">
            <div className="form-group w-1/2">
              <label
                htmlFor="soLuongPhieu"
                className="block text-sm font-medium text-gray-700"
              >
                Số lượng phiếu
              </label>
              <input
                type="number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="soLuongPhieu"
                name="soLuongPhieu"
                required
              />
            </div>
            <div className="form-group w-1/2">
              <label
                htmlFor="giaTriDonToiThieu"
                className="block text-sm font-medium text-gray-700"
              >
                Giá trị đơn tối thiểu
              </label>
              <input
                type="number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="giaTriDonToiThieu"
                name="giaTriDonToiThieu"
                required
              />
            </div>
          </div>

          {/* Giá trị giảm tối đa và Trạng Thái */}
          <div className="flex space-x-4 mb-6">
            <div className="form-group w-1/2">
              <label
                htmlFor="giaTriGiamToiDa"
                className="block text-sm font-medium text-gray-700"
              >
                Giá trị giảm tối đa
              </label>
              <input
                type="number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="giaTriGiamToiDa"
                name="giaTriGiamToiDa"
                required
              />
            </div>
            <div className="form-group w-1/2">
              <label
                htmlFor="trangThai"
                className="block text-sm font-medium text-gray-700"
              >
                Trạng Thái
              </label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="trangThai"
                name="trangThai"
              >
                <option value="1">Đang hoạt động</option>
                <option value="2">Ngừng hoạt động</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Tạo mới
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ManageVoucherComponent;
