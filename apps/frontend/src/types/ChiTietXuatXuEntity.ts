import { NuocSanXuatEntity } from "./NuocSanXuatEntity";
import { ThuongHieuEntity } from "./ThuongHieuEntity";

export type ChiTietXuatXuEntity = {
    id: number;
    createBy: string;
    updateBy: string;
    createAt: string;
    updateAt: string;
    ma: string;
    ten: string;
    nuocSanXuat: NuocSanXuatEntity, 
    thuongHieu: ThuongHieuEntity
}