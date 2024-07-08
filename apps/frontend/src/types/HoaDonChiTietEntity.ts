import { HoaDonEntity } from "./HoaDonEntity";
import { SanPhamChiTietEntity } from "./SanPhamChiTietEntity";

export type HoaDonChiTietEntity = {
    ma: string,
    gia: number,
    soLuong: number,
    hoadon: HoaDonEntity,
    sanPhamChiTiet: SanPhamChiTietEntity,

}