import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { instance } from "../../../axios/instance";
import { HoaDonEntity } from "../../../entity/HoaDonEntity";
import ProductInBillComponent from "./ProductInBillComponent";
import { HoaDonChiTietEntity } from "../../../entity/HoaDonChiTietEntity";
import ThongTinDonHangComponent from "./ThongTinDonHangComponent";
import StepperComponent from "./StepperComponent";

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
                {/* THÔNG TIN */}
                {hoaDon && <ThongTinDonHangComponent hoaDon={hoaDon} />}
                {hoaDon && <StepperComponent hoaDon={hoaDon} refreshBill = {fetchData} />}

                {/*  */}
                <div className="mt-2 py-4 px-2">
                    <ProductInBillComponent billDetails={hoaDonChiTiets}></ProductInBillComponent>
                </div>
            </div>
        </Fragment>
    );
}

export default ConfirmBillComponent;
