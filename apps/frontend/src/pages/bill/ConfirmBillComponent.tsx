import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import ProductInBillComponent from "./ProductInBillComponent";
import ThongTinDonHangComponent from "./ThongTinDonHangComponent";
import StepperComponent from "./StepperComponent";
import ExportBillComponent from "./ExportBillComponent";
import { HoaDonEntity } from "../../types/HoaDonEntity";
import { HoaDonChiTietEntity } from "../../types/HoaDonChiTietEntity";
import { instance } from "../../axios/instance";
import HistoryBillComponent from "./HistoryBillComponent";
import PaymentInfoComponent from "./PaymentInfoComponent";

const ConfirmBillComponent = () => {
    const useParam = useParams();
    const [hoaDon, setHoaDon] = useState<HoaDonEntity>();
    const [hoaDonChiTiets, setHoaDonChiTiets] = useState<HoaDonChiTietEntity[]>([]);
    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false)

    const fetchData = async () => {
        await instance.get(`api/bills/${useParam["id"]}`).then(
            function (response) {
                console.log(response);
                setHoaDon(response.data);
            }
        );
        await instance.get(`api/bill-details/in-bill/${useParam["id"]}`).then(
            function (response) {
                console.log(response);
                setHoaDonChiTiets(response.data);
            }
        );
    };

    useEffect(() => {
        console.log(useParam);
        fetchData();
    }, []);

    return (
        <Fragment>
            <div className="overflow-auto flex flex-col gap-2">
                <div className="rounded-md bg-gray-200 p-2">
                    <div className="flex justify-between">
                        <span className="text-[18px] font-semibold">Lịch sử hóa đơn</span>
                        {hoaDon && isOpenHistory && <HistoryBillComponent id={hoaDon?.id} onClose={setIsOpenHistory}></HistoryBillComponent>}
                        <button onClick={() => setIsOpenHistory(true)} className="text-blue-600 underline underline-offset-2 text-sm">Xem lịch sử</button>
                    </div>
                    {hoaDon && <StepperComponent hoaDon={hoaDon} refreshBill={fetchData} />}
                </div>
                <div className="rounded-md bg-gray-200 p-2">
                    <span className="text-[18px] font-semibold">Thông tin hóa đơn</span>
                    {hoaDon && <ThongTinDonHangComponent hoaDon={hoaDon} />}
                </div>
                <div className="rounded-md bg-gray-200 p-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[18px] font-semibold">Thông tin thanh toán</span>
                        <button className="text-blue-600 underline underline-offset-2 text-sm">Chỉnh sửa</button>
                    </div>
                    {hoaDon && <PaymentInfoComponent hoaDon={hoaDon} refreshBill={fetchData} />}
                </div>
                <div className="rounded-md bg-gray-200 p-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[18px] font-semibold">Danh sách Sản phẩm</span>
                        <button className="text-blue-600 underline underline-offset-2 text-sm">Thêm sản phẩm</button>
                    </div>
                    <ProductInBillComponent billDetails={hoaDonChiTiets}></ProductInBillComponent>
                </div>
                <div className="rounded-md bg-gray-200 p-2">
                    <span className="text-[18px] font-semibold">Xác nhận hóa đơn</span>
                    {hoaDon && <ExportBillComponent hoaDon={hoaDon} refreshBill={fetchData} />}
                </div>
            </div>
        </Fragment>
    );
}

export default ConfirmBillComponent;
