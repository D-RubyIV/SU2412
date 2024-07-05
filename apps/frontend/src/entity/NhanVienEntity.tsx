import ChucVuEntity from "./ChucVuEntity";

type NhanVienEntity = {
    id: number;
    createBy: string;
    updateBy: string;
    createAt: string;
    updateAt: string;
    ma: string;
    email: string;
    password: string;
    gioiTinh: boolean;
    soDienThoai: string;
    ngaySinh: string;
    trangThai: string;
    ghiChu: string;
    deleted: boolean;
    chucVu: ChucVuEntity;
    cccd: string;
}
export default NhanVienEntity;