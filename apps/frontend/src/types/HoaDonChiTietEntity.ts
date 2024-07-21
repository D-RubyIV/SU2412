import { HoaDonEntity } from "./HoaDonEntity";
import { SanPhamChiTietEntity } from "./SanPhamChiTietEntity";

export type HoaDonChiTietEntity = {
    id: number,
    ma: string,
    gia: number,
    soLuong: number,
    hoadon: HoaDonEntity,
    sanPhamChiTiet: SanPhamChiTietEntity,

}