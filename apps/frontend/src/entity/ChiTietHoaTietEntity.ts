import { LoaiHoaTIetEntity } from "./LoaiHoaTIetEntity";
import { MoTaHoaTietEntity } from "./MoTaHoaTietEntity";

export type ChiTietHoaTietEntity = {
    id: number;
    createBy: string;
    updateBy: string;
    createAt: string;
    updateAt: string;
    ma: string;
    ten: string;
    loaiHoaTIet: LoaiHoaTIetEntity,
    moTaHoaTiet: MoTaHoaTietEntity
}