import { DiaChiNhan } from "./DiaChiNhan";
import { Province } from "./Province";

export interface KhachHang {
  id: number;
  ma: string;
  email: string;
  password: string;
  gioiTinh: boolean;
  soDienThoai: string;
  hoTen: string;
  ngaySinh: string;
  trangThai?: string;
  deleted?: boolean;
  diaChiNhan?: DiaChiNhan;
  province?: Province;
}
