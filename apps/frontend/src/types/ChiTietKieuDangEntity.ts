import { KieuCoAoEntity } from "./KieuCoAoEntity";
import { KieuDangAoEntity } from "./KieuDangAoEntity";
import { KieuTaiAoEntity } from "./KieuTaiAoEntity";

export type ChiTietKieuDangEntity = {
    id: number;
    createBy: string;
    updateBy: string;
    createAt: string;
    updateAt: string;
    ma: string;
    ten: string;
    kieuCoAo: KieuCoAoEntity, 
    kieuTaiAo: KieuTaiAoEntity
    kieuDangAo: KieuDangAoEntity
}