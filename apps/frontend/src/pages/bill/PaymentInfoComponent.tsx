import { Fragment } from "react/jsx-runtime";
import { HoaDonEntity } from "../../types/HoaDonEntity";


const PaymentInfoComponent = ({ hoaDon, refreshBill }: { hoaDon: HoaDonEntity, refreshBill: () => Promise<void> }) => {
    return (
        <Fragment>
            <div className="py-4">
                <div className="text-sm">
                    <div>
                        <span>Hình thức thanh toán:</span>
                        {" "}
                        <span>{hoaDon?.hinhThucThanhToan?.ten}</span>
                    </div>
                    <div>
                        
                        <span>Địa chỉ nhận:</span>
                        {" "}
                        <span>{hoaDon?.diaChiNhan}</span>
                    </div>
                    <div>
                        <span>SDT nhận:</span>
                        {" "}
                        <span>{hoaDon?.soDienThoaiNhan}</span>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default PaymentInfoComponent;