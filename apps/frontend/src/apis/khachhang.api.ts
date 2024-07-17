import { PhieuGiamGiaEntity, PhieuGiamGias } from "../types/PhieuGiamGiaEntity";
import http from "../utils/http";

export const getKhachHangs = (page: number | string, limit: number | string) => http.get<PhieuGiamGias>('admin/phieu-giam-gia/get-all', {
    params: {
        _page: page,
        _limit: limit
    }
})


export const getPhieuGiamGia = (id: number | string) => http.get<PhieuGiamGiaEntity>(`students/${id}`)
