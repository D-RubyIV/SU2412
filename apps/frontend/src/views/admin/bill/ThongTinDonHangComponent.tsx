import { Fragment } from "react/jsx-runtime";
import { HoaDonEntity } from "../../../entity/HoaDonEntity";
import { format } from "date-fns";

const ThongTinDonHangComponent = ({ hoaDon }: { hoaDon: HoaDonEntity }) => {
    return (
        <Fragment>
            <div className="text-[12.5px]">
                <div className="text-sm w-full px-2 py-4 shadow-md rounded-xl">
                    <span>Thông tin đơn hàng - Mã đơn:</span>
                    {" "}
                    <span>{hoaDon?.ma}</span>
                </div>
                <div className="flex gap-2 justify-between">
                    <div className="grid grid-cols-2  gap-2">
                        <div>
                            <span>Tạo lúc:</span>
                            {" "}
                            <span>{(hoaDon as HoaDonEntity)?.createAt && format((hoaDon as HoaDonEntity)?.createAt?.toString(), 'HH:mm dd/MM/yyyy')}</span>
                        </div>
                        <div>
                            <span>Trạng thái:</span>
                            {" "}
                            <span>{hoaDon?.trangThai}</span>
                        </div>
                        {/* <div>
                            <span>Trạng thái vận chuyên:</span>
                            {" "}
                            <span>{hoaDon?.trangThaiVanChuyen}</span>
                        </div> */}
                        <div>
                            <span>Loại hóa đơn:</span>
                            {" "}
                            <span>{hoaDon?.loaiHoaDon}</span>
                        </div>
                        <div>
                            <span>Phí vận chuyển:</span>
                            {" "}
                            <span>{hoaDon?.phiVanChuyen}</span>
                        </div>
                        <div>
                            <span>Hình thức thanh toán:</span>
                            {" "}
                            <span>{hoaDon?.hinhThucThanhToan?.ten}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <span>Người phụ trách:</span>
                            {" "}
                            <span>{hoaDon?.nhanVien?.hoTen}</span>
                        </div>
                        <div>
                            <span>Chức vụ phụ trách:</span>
                            {" "}
                            <span>{hoaDon?.nhanVien?.chucVu?.ten}</span>
                        </div>
                        <div>
                            <span>Tên khách hàng:</span>
                            {" "}
                            <span>{hoaDon?.diaChiNhan}</span>
                        </div>
                        <div>
                            <span>Địa chỉ nhận:</span>
                            {" "}
                            <span>{hoaDon?.diaChiNhan}</span>
                        </div>
                        <div>
                            <span>Số điện thoại nhận:</span>
                            {" "}
                            <span>{hoaDon?.soDienThoaiNhan}</span>
                        </div>
                    </div>
                </div>



            </div>
        </Fragment>
    );
}

export default ThongTinDonHangComponent;