// // type PhieuGiamGiaEntity = {
// //     id: number;
// //     createBy: string;
// //     updateBy: string;
// //     createAt: string;
// //     updateAt: string;
// //     ma: string;
// //     ten: string;
// //     thoiGianBatDau: string;
// //     thoiGianKetThuc: string;
// //     trangThai: string;
// //     soLuong: number;
// //     phanTramToiDa: number;
// //     tongTienToiThieu: number;
// //     loaiPhieu: string;
// //     deleted: boolean;
// //     khachHangs: any[];
// // }
// // export default PhieuGiamGiaEntity;

// export interface PhieuGiamGiaEntity {
//   id: number;
//   //   createBy: string;
//   //   updateBy: string;
//   //   createAt: string;
//   //   updateAt: string;
//   ma: string;
//   ten: string;
//   thoiGianBatDau: string;
//   thoiGianKetThuc: string;
//   trangThai: string;
//   soLuong: number;
//   phanTramToiDa: number;
//   tongTienToiThieu: number;
//   loaiPhieu: string;
//   //   deleted: boolean;
//   khachHangs: any[];
// }

// export type PhieuGiamGia = Pick<
//   PhieuGiamGiaEntity,
//   | "id"
//   | "ma"
//   | "ten"
//   | "thoiGianBatDau"
//   | "thoiGianKetThuc"
//   | "soLuong"
//   | "phanTramToiDa"
//   | "tongTienToiThieu"
//   | "loaiPhieu"
//   | "khachHangs"
//   //   | "deleted"
//   | "trangThai"
// >[];

// export interface PhieuGiamGias {
//   content: PhieuGiamGia[];
//   totalElements: number;
//   totalPages: number;
//   first: boolean;
//   last: boolean;
//   size: number;
//   number: number;
//   numberOfElements: number;
//   sort: {
//     sorted: boolean;
//     unsorted: boolean;
//     empty: boolean;
//   };
// }

export interface PhieuGiamGiaEntity {
  id: number;
  soLuong: number;
  trangThai: string;
  loaiPhieu: string;
  email: string | null;
  soDienThoai: string | null;
  khachHangs: any | null; // Bạn có thể định nghĩa một interface cụ thể cho khachHangs nếu cần
  ten: string;
  ma: string;
  phanTramToiDa: number;
  tongTienToiThieu: number;
  thoiGianKetThuc: string;
  thoiGianBatDau: string;
}

export interface PhieuGiamGias {
  content: PhieuGiamGiaEntity[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
