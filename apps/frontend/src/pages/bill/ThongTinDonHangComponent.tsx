import { Fragment } from "react/jsx-runtime";
import { format } from "date-fns";
import { HoaDonEntity } from "../../types/HoaDonEntity";

const ThongTinDonHangComponent = ({ hoaDon }: { hoaDon: HoaDonEntity }) => {
    return (
        <Fragment>
            <div className="text-[12.5px]">
                <div className="text-sm w-full py-4 grid grid-cols-3">
                    <div >
                        <span>Thông tin đơn hàng - Mã đơn:</span>
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
                </div>
            </div>
        </Fragment>
    );
}

export default ThongTinDonHangComponent;