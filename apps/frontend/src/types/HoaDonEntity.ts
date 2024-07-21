import { HinhThucThanhToanEntity } from "./HinhThucThanhToanEntity";
import { KhachHangEntity } from "./KhachHangEntity";
import LichSuDatHang from "./LichSuDatHangEntity";
import NhanVienEntity from "./NhanVienEntity";
import PhieuGiamGiaEntity from "./PhieuGiamGiaEntity";

export type HoaDonEntity = {
    id: number;
    createBy: string;
    updateBy: string;
    createAt: string;
    updateAt: string;
    diaChiNhan: string;
    soDienThoaiNhan: string;
    ma: string;
    trangThai: string;
    tongTien: number;
    tongTienSauGiam: number;
    soDienThoaiNguoiShip: string;
    tenNguoiNhan: string;
    ngayDatHang: string;
    ngayGiaoHang: string;
    ngayNhanHangDuKien: string;
    ngayNhanHang: string;
    trangThaiVanChuyen: string;
    phiVanChuyen: number;
    loaiHoaDon: string;
    khachHang: KhachHangEntity;
    lichSuDatHang: LichSuDatHang;
    phieuGiamGia: PhieuGiamGiaEntity;
    nhanVien: NhanVienEntity;
    hinhThucThanhToan: HinhThucThanhToanEntity;
    deleted: boolean;
    giaoHang: boolean;
}
