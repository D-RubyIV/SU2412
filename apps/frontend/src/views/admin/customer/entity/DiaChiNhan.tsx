import { Ward } from "./Ward";

export interface DiaChiNhan {
  id: number;
  diaChi: string;
  tenNguoiNhan?: string;
  soDienThoaiNhan?: string;
  deleted?: boolean;
  ward?: Ward;
}
