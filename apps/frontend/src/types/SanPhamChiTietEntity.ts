import { HinhAnhEntity } from "./HinhAnhEntity";
import { KichThuocEntity } from "./KichThuocEntity";
import { LoaiEntity } from "./LoaiEntity";
import { MauSacEntity } from "./MauSacEntity";
import { NuocSanXuatEntity } from "./NuocSanXuatEntity";
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
    nuocSanXuat: NuocSanXuatEntity;
    hinhAnh: HinhAnhEntity;
    deleted: boolean;
}
