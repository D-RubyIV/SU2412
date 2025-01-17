import { Fragment } from "react/jsx-runtime";
import { HoaDonEntity } from "../../types/HoaDonEntity";

const ExportBillComponent = ({ hoaDon, refreshBill }: { hoaDon: HoaDonEntity, refreshBill: () => Promise<void> }) => {
    return (
        <Fragment>
            <div className="grid grid-cols-2 gap-5 py-4 text-sm font-semibold text-gray-700">
                {/* <div>
                    <div className="text-sm flex gap-2 items-center">
                        <input placeholder="Dùng phiếu giảm giá" className="bg-transparent"></input>
                        <button className="bg-indigo-300 py-1 px-2 rounded-md">Chọn</button>
                    </div>
                </div> */}
                <div className="text-sm">
                    <div>
                        <span>Tổng tiền:</span>
                        {" "}
                        <span className="text-red-500">{hoaDon?.tongTien.toLocaleString("vi-VN") + "₫"}</span>
                    </div>
                    <div>
                        <span>Tổng tiền sau giảm:</span>
                        {" "}
                        <span className="text-red-500">{hoaDon?.tongTienSauGiam.toLocaleString("vi-VN") + "₫"}</span>
                    </div>
                    <div>
                        <span>Phí vận chuyển:</span>
                        {" "}
                        <span className="text-red-500">{hoaDon?.phiVanChuyen.toLocaleString("vi-VN") + "₫"}</span>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ExportBillComponent;