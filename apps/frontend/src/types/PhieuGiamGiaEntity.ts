type PhieuGiamGiaEntity = {
    id: number;
    createBy: string;
    updateBy: string;
    createAt: string;
    updateAt: string;
    ma: string;
    ten: string;
    thoiGianBatDau: string;
    thoiGianKetThuc: string;
    trangThai: string;
    soLuong: number;
    phanTramToiDa: number;
    tongTienToiThieu: number;
    loaiPhieu: string;
    deleted: boolean;
    khachHangs: any[];
}
export default PhieuGiamGiaEntity;