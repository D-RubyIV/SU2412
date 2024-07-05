import { ChiTietChatLieuEntity } from "./ChiTietChatLieuEntity ";
import { ChiTietHoaTietEntity } from "./ChiTietHoaTietEntity";
import { ChiTietKieuDangEntity } from "./ChiTietKieuDangEntity";
import { ChiTietXuatXuEntity } from "./ChiTietXuatXuEntity";
import { HinhAnhEntity } from "./HinhAnhEntity";
import { KichThuocEntity } from "./KichThuocEntity";
import { LoaiEntity } from "./LoaiEntity";
import { MauSacEntity } from "./MauSacEntity";
import { SanPhamEntity } from "./SanPhamEntity";

export type SanPhamChiTietEntity = {
    id: number;
    createBy: string;
    updateBy: string;
    createAt: string;
    updateAt: string;
    ma: string;
    soLuong: number;
    gia: number;
    moTaNgan: string;
    moTaChiTiet: string;
    sanPham: SanPhamEntity;
    mauSac: MauSacEntity;
    kichThuoc: KichThuocEntity;
    loai: LoaiEntity;
    chiTietHoaTiet: ChiTietHoaTietEntity;
    chiTietXuatXu: ChiTietXuatXuEntity;
    chiTietChatLieu: ChiTietChatLieuEntity;
    chiTietKieuDang: ChiTietKieuDangEntity;
    hinhAnh: HinhAnhEntity;
    deleted: boolean;
}
