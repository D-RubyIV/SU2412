import { Fragment } from "react/jsx-runtime";
import { format } from "date-fns";
import { HoaDonEntity } from "../../types/HoaDonEntity";

const ThongTinDonHangComponent = ({ hoaDon }: { hoaDon: HoaDonEntity }) => {
    return (
        <Fragment>
            <div className="text-sm font-semibold text-gray-700">
                <div className="w-full py-4 grid grid-cols-3">
                    <div >
                        <span>Mã đơn:</span>
                        {" "}
                        <span>{hoaDon?.ma}</span>
                    </div>
                    <div>
                        <span>Tạo lúc:</span>
                        {" "}
                        <span>{(hoaDon as HoaDonEntity)?.createAt && format((hoaDon as HoaDonEntity)?.createAt?.toString(), 'HH:mm dd/MM/yyyy')}</span>
                    </div>
                    <div>
                        <span>Loại hóa đơn:</span>
                        {" "}
                        <span>{hoaDon?.loaiHoaDon}</span>
                    </div>
                    <div>
                        <span>Hình thức thanh toán:</span>
                        {" "}
                        <span>{hoaDon?.hinhThucThanhToan?.ten}</span>
                    </div>
                    <div>
                        <span>Tên người nhận:</span>
                        {" "}
                        <span>{hoaDon?.tenNguoiNhan}</span>
                    </div>

                    <div>
                        <span>SDT nhận:</span>
                        {" "}
                        <span>{hoaDon?.soDienThoaiNhan}</span>
                    </div>
                </div>
                <div>
                    <span>Địa chỉ nhận:</span>
                    {" "}
                    <span>{hoaDon?.diaChiNhan}</span>
                </div>
            </div>
        </Fragment>
    );
}

export default ThongTinDonHangComponent;