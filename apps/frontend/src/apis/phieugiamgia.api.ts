import { PhieuGiamGiaEntity, PhieuGiamGias } from "../types/PhieuGiamGiaEntity";
import http from "../utils/http";

export const getPhieuGiamGias = (page: number | string, limit: number | string) => http.get<PhieuGiamGias>('admin/phieu-giam-gia/get-all', {
    params: {
        _page: page,
        _limit: limit
    }
})


export const getPhieuGiamGia = (id: number | string) => http.get<PhieuGiamGiaEntity>(`/admin/phieu-giam-gia/${id}`)

export const addPhieuGiamGia = (phieuGiamGia: Omit<PhieuGiamGiaEntity, 'id'>) => http.post<PhieuGiamGiaEntity>('/admin/phieu-giam-gia/add', phieuGiamGia)

export const updatePhieuGiamGia = (id: number | string, phieuGiamGia: PhieuGiamGiaEntity) => http.put<PhieuGiamGiaEntity>(`admin/phieu-giam-gia/update/${id}`, phieuGiamGia)

export const deletePhieuGiamGia = (id: number | string) => http.put<{}>(`/admin/phieu-giam-gia/delete/${id}`)
