import { ChatLieuEntity } from "./ChatLieuEntity";
import { DoDayCuaVaiEntity } from "./DoDayCuaVaiEntity";
import { KhaNangCoDanEntity } from "./KhaNangCoDanEntity";

export type ChiTietChatLieuEntity = {
    id: number;
    createBy: string;
    updateBy: string;
    createAt: string;
    updateAt: string;
    ma: string;
    ten: string;
    deleted: boolean;
    chatLieu: ChatLieuEntity;
    doDayCuaVai: DoDayCuaVaiEntity;
    khaNangCoDan: KhaNangCoDanEntity;
}