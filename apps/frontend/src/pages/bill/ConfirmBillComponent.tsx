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

const ConfirmBillComponent = () => {
    const useParam = useParams();
    const [hoaDon, setHoaDon] = useState<HoaDonEntity>();
    const [hoaDonChiTiets, setHoaDonChiTiets] = useState<HoaDonChiTietEntity[]>([]);

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
            <div className="overflow-auto">
                <div>
                    <span className="text-[18px] font-semibold">Thông tin hóa đơn</span>
                    {hoaDon && <ThongTinDonHangComponent hoaDon={hoaDon} />}
                </div>
                <div>
                    <span className="text-[18px] font-semibold">Lịch sử hóa đơn</span>
                    {hoaDon && <StepperComponent hoaDon={hoaDon} refreshBill={fetchData} />}
                </div>
                <div className="mt-2 py-4 px-2">
                    <span className="text-[18px] font-semibold">Danh sách Sản phẩm</span>
                    <ProductInBillComponent billDetails={hoaDonChiTiets}></ProductInBillComponent>
                </div>
                <div className="mt-2 py-4 px-2">
                    <span className="text-[18px] font-semibold">Xác nhận hóa đơn</span>
                    {hoaDon && <ExportBillComponent hoaDon={hoaDon} refreshBill={fetchData} />}
                </div>
            </div>
        </Fragment>
    );
}

export default ConfirmBillComponent;
