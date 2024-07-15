// type PhieuGiamGiaEntity = {
//     id: number;
//     createBy: string;
//     updateBy: string;
//     createAt: string;
//     updateAt: string;
//     ma: string;
//     ten: string;
//     thoiGianBatDau: string;
//     thoiGianKetThuc: string;
//     trangThai: string;
//     soLuong: number;
//     phanTramToiDa: number;
//     tongTienToiThieu: number;
//     loaiPhieu: string;
//     deleted: boolean;
//     khachHangs: any[];
// }
// export default PhieuGiamGiaEntity;

export interface PhieuGiamGiaEntity {
  id: number;
  //   createBy: string;
  //   updateBy: string;
  //   createAt: string;
  //   updateAt: string;
  ma: string;
  ten: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  trangThai: string;
  soLuong: number;
  phanTramToiDa: number;
  tongTienToiThieu: number;
  loaiPhieu: string;
  //   deleted: boolean;
  khachHangs: any[];
}

export type PhieuGiamGias = Pick<
  PhieuGiamGiaEntity,
  | "id"
  | "ma"
  | "ten"
  | "thoiGianBatDau"
  | "thoiGianKetThuc"
  | "soLuong"
  | "phanTramToiDa"
  | "tongTienToiThieu"
  | "loaiPhieu"
  | "khachHangs"
  //   | "deleted"
  | "trangThai"
>[];
