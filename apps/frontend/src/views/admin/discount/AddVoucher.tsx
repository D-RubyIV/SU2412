import { useEffect, useMemo, useState } from "react";
import { PhieuGiamGiaEntity } from "../../../types/PhieuGiamGiaEntity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPhieuGiamGia,
  getPhieuGiamGia,
  updatePhieuGiamGia,
} from "../../../apis/phieugiamgia.api";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useMatch, useParams } from "react-router-dom";

type FormStateType = Omit<PhieuGiamGiaEntity, "id"> | PhieuGiamGiaEntity;

const initialFormState: FormStateType = {
  ma: "",
  ten: "",
  thoiGianBatDau: "",
  thoiGianKetThuc: "", // Correct type should match your definition (Date or string)
  trangThai: "", // Correct type should match your definition
  soLuong: 0, // Assuming it's a number
  phanTramToiDa: 0, // Assuming it's a number
  tongTienToiThieu: 0, // Assuming it's a number
  loaiPhieu: "", // Correct type should match your definition
  khachHangs: [], // Example: Should match your definition
};

type FormError =
  | {
      [key in keyof FormStateType]: string;
    }
  | null;

const loaiPhieu = {
  ToanBo: "ToanBo",
  KhachHang: "KhachHang",
};
function AddVoucher() {
  const [formState, setFormState] = useState<FormStateType>(initialFormState);
  const [todos, setTodos] = useState<any[]>([]);
  const addMatch = useMatch("/manage/khuyen-mai");
  const isAddMode = Boolean(addMatch);
  const [selectedItems, setSelectedItems] = useState([]);
  const { id } = useParams();
  const queryClient = useQueryClient();

  // call api khach hang
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/khachhang");
      setTodos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };
  // het call api khach hang

  const addPhieuGiamGiaMutation = useMutation({
    mutationFn: (body: FormStateType) => {
      return addPhieuGiamGia(body);
    },
  });

  const phieuGiamGiaQuery = useQuery({
    queryKey: ["phieuGiamGia", id],
    queryFn: () => getPhieuGiamGia(id as string),
    enabled: id !== undefined,
    staleTime: 1000 * 10,
  });

  useEffect(() => {
    if (phieuGiamGiaQuery.data) {
      setFormState(phieuGiamGiaQuery.data.data);
    }
  }, [phieuGiamGiaQuery.data]);

  const updatePhieuGiamGiaMutation = useMutation({
    mutationFn: (_) =>
      updatePhieuGiamGia(id as string, formState as PhieuGiamGiaEntity),
    onSuccess: (data) => {
      queryClient.setQueryData(["phieuGiamGia", id], data);
    },
  });

  const errorForm: FormError = useMemo(() => {
    const error = isAddMode
      ? addPhieuGiamGiaMutation.error
      : updatePhieuGiamGiaMutation.error;
    if (
      isAxiosError<{ error: FormError }>(error) &&
      error.response?.status === 422
    ) {
      return error.response?.data.error;
    }
    return null;
  }, [
    addPhieuGiamGiaMutation.error,
    isAddMode,
    updatePhieuGiamGiaMutation.error,
  ]);

  // Dùng currying
  const handleChange =
    (name: keyof FormStateType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [name]: event.target.value }));
      if (addPhieuGiamGiaMutation.data || addPhieuGiamGiaMutation.error) {
        addPhieuGiamGiaMutation.reset();
      }
    };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (isAddMode) {
  //     addPhieuGiamGiaMutation.mutate(formState, {
  //       onSuccess: () => {
  //         setFormState(initialFormState);
  //         toast.success("Add thành công!");
  //       },
  //     });
  //   } else {
  //     updatePhieuGiamGiaMutation.mutate(undefined, {
  //       onSuccess: (_) => {
  //         toast.success("Update thành công!");
  //       },
  //     });
  //   }
  // };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedFormState = {
      ...formState,
      khachHangs: selectedItems,
    };
    if (isAddMode) {
      addPhieuGiamGiaMutation.mutate(updatedFormState, {
        onSuccess: () => {
          setFormState(initialFormState);
          setSelectedItems([]);
          toast.success("Add thành công!");
        },
      });
    } else {
      updatePhieuGiamGiaMutation.mutate(undefined, {
        onSuccess: (_) => {
          toast.success("Update thành công!");
        },
      });
    }
  };
  const handleCheckboxChange = (item: any) => {
    const fullName = item.hoTen;

    setSelectedItems((prevSelectedItems: any[]) => {
      if (prevSelectedItems.includes(fullName)) {
        return prevSelectedItems.filter(
          (selectedItem) => selectedItem !== fullName
        );
      } else {
        return [...prevSelectedItems, fullName];
      }
    });
  };

  return (
    <div className="grid grid-cols-5 gap-5">
      {/* Form nhập liệu */}
      <div className="w-[100%] h-[80vh] p-6 bg-white rounded-lg shadow-xl overflow-y-auto col-span-2">
        <h1 className="text-xl font-semibold mb-6 text-indigo-600">
          Thêm mới phiếu giảm giá
        </h1>
        <form name="phieuGiamGiaForm" onSubmit={handleSubmit}>
          {/* Mã phiếu giảm giá */}
          <div className="mb-4 relative">
            <label
              htmlFor="ma"
              className="block text-sm font-medium text-gray-700"
            >
              Mã phiếu:
            </label>
            <input
              type="text"
              id="ma"
              name="ma"
              value={formState.ma}
              onChange={handleChange("ma")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onFocus={() => handleInputFocus("ma", true)}
              onBlur={() => handleInputFocus("ma", false)}
            />
            <span className="hidden text-sm font-medium text-red-500 mt-1 absolute left-0 bg-white p-1 rounded-lg shadow-md transition-all duration-300 ease-in-out opacity-0 hover:opacity-100">
              Có thể auto tạo hoặc tạo bằng tay
            </span>
            {errorForm && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Lỗi! </span>
                {errorForm.ma}
              </p>
            )}
          </div>
          {/* Tên */}
          <div className="mb-4">
            <label
              htmlFor="ten"
              className="block text-sm font-medium text-gray-700"
            >
              Tên:
            </label>
            <input
              type="text"
              id="ten"
              name="ten"
              value={formState.ten}
              onChange={handleChange("ten")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />

            {errorForm && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Lỗi! </span>
                {errorForm.ten}
              </p>
            )}
          </div>
          {/* Giá trị giảm */}
          <div className="mb-4">
            <label
              htmlFor="phanTramToiDa"
              className="block text-sm font-medium text-gray-700"
            >
              Giá trị giảm(%):
            </label>
            <input
              type="number"
              id="phanTramToiDa"
              name="phanTramToiDa"
              value={formState.phanTramToiDa}
              onChange={handleChange("phanTramToiDa")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errorForm && (
              <p className="mt-2 text-sm text-red-600">
                <span className="font-medium">Lỗi! </span>
                {errorForm.phanTramToiDa}
              </p>
            )}
          </div>
          {/* Ngày bắt đầu và Ngày kết thúc */}
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label
                htmlFor="thoiGianBatDau"
                className="block text-sm font-medium text-gray-700"
              >
                Ngày bắt đầu
              </label>
              <input
                type="datetime-local"
                id="thoiGianBatDau"
                name="thoiGianBatDau"
                value={formState.thoiGianBatDau}
                onChange={handleChange("thoiGianBatDau")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              {errorForm && (
                <p className="mt-2 text-sm text-red-600">
                  <span className="font-medium">Lỗi! </span>
                  {errorForm.thoiGianBatDau}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <label
                htmlFor="thoiGianKetThuc"
                className="block text-sm font-medium text-gray-700"
              >
                Ngày kết thúc
              </label>
              <input
                type="datetime-local"
                id="thoiGianKetThuc"
                name="thoiGianKetThuc"
                value={formState.thoiGianKetThuc}
                onChange={handleChange("thoiGianKetThuc")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          {/* Số lượng phiếu và Giá trị đơn tối thiểu */}
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label
                htmlFor="soLuong"
                className="block text-sm font-medium text-gray-700"
              >
                Số lượng phiếu
              </label>
              <input
                type="number"
                id="soLuong"
                name="soLuong"
                value={formState.soLuong}
                onChange={handleChange("soLuong")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="tongTienToiThieu"
                className="block text-sm font-medium text-gray-700"
              >
                Giá trị đơn tối thiểu
              </label>
              <input
                type="number"
                id="tongTienToiThieu"
                name="tongTienToiThieu"
                value={formState.tongTienToiThieu}
                onChange={handleChange("tongTienToiThieu")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          {/* Loại phiếu */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Loại phiếu:
            </label>
            <div className="flex items-center mt-2 space-x-4">
              <div>
                <input
                  type="radio"
                  id="loaiPhieuDon"
                  name="loaiPhieu"
                  value={loaiPhieu.ToanBo}
                  checked={formState.loaiPhieu === loaiPhieu.ToanBo}
                  onChange={handleChange("loaiPhieu")}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="loaiPhieuDon"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  Toàn Bộ
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="loaiPhieuKhachHang"
                  name="loaiPhieu"
                  value={loaiPhieu.KhachHang}
                  checked={formState.loaiPhieu === loaiPhieu.KhachHang}
                  onChange={handleChange("loaiPhieu")}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="loaiPhieuKhachHang"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  Khách hàng
                </label>
              </div>
            </div>
          </div>
          {/* Nút submit */}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            {isAddMode ? "Add" : "Update"}
          </button>
          {/* <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Thêm mới
          </button> */}
        </form>
      </div>

      {/* Bảng danh sách */}
      <div className="w-[100%] h-[85vh] p-6 bg-white rounded-lg shadow-xl overflow-y-auto col-span-3">
        {/* <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700">
          Danh sách khách hàng
        </h2> */}
        <form name="phieuGiamGiaForm">
          <div className="mb-4">
            <input
              type="text"
              id="maPhieu"
              placeholder="Tìm kiếm sản phẩm"
              name="maGiamGia"
              maxLength={10}
              required
              className="mt-1 block w-[70%] p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-full bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
            <table className="min-w-full bg-white ">
              <thead className="bg-white-200 text-gray-600">
                <tr>
                  <th className="py-2 px-4 border-b">Select</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Số điện thoại</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {/* Example rows */}

                {todos.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {/* <input
                        type="checkbox"
                        checked={selectedItems.includes(item)}
                        onChange={() => handleCheckboxChange(item)}
                      /> */}
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={() => handleCheckboxChange(item)}
                        checked={selectedItems.includes(item.hoTen)}
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {item.hoTen}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {item.email}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      {item.soDienThoai}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVoucher;
