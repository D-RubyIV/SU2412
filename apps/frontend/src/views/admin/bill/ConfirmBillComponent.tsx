import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { instance } from "../../../axios/instance";
import { format } from "date-fns";
import { HoaDonEntity } from "../../../entity/HoaDonEntity";
import ProductInBillComponent from "./ProductInBillComponent";
import { HoaDonChiTietEntity } from "../../../entity/HoaDonChiTietEntity";
import VerticalLinearStepper from "../../../ui/VerticalLinearStepper";

const ConfirmBillComponent = () => {
    const useParam = useParams();
    const [hoaDon, setHoaDon] = useState<HoaDonEntity>();
    const [hoaDonChiTiets, setHoaDonChiTiets] = useState<HoaDonChiTietEntity[]>([])

    const fetchData = async () => {
        await instance.get(`api/bills/${useParam["id"]}`).then(
            function (response) {
                console.log(response)
                setHoaDon(response.data)
            }
        )
        await instance.get(`api/bill-details/in-bill/${useParam["id"]}`).then(
            function (response) {
                console.log(response)
                setHoaDonChiTiets(response.data)
            }
        )

    }

    useEffect(() => {
        console.log(useParam)
        fetchData()
    }, [])
    return (
        <Fragment>
            <div className="overflow-auto">
                {/* THÔNG TIN */}
                <div className="text-[12.5px]">
                    <div className="text-sm w-full px-2 py-4 shadow-md rounded-xl">
                        <span>Thông tin đơn hàng - Mã đơn:</span>
                        {" "}
                        <span>{hoaDon?.ma}</span>
                    </div>
                    <div>
                        <div className="grid grid-cols-3 gap-4 text-sm py-4 px-2 shadow-md rounded-xl mt-2 text-[12.5px]">
                            <div>
                                <span>Người phụ trách:</span>
                                {" "}
                                <span>{hoaDon?.nhanVien?.hoTen}</span>
                            </div>
                            <div>
                                <span>Số điện thoại:</span>
                                {" "}
                                <span>{hoaDon?.nhanVien?.soDienThoai}</span>
                            </div>
                            <div>
                                <span>Chức vụ:</span>
                                {" "}
                                <span>{hoaDon?.nhanVien?.chucVu?.ten}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid grid-cols-2 gap-4 text-sm shadow-md py-4 px-2 rounded-2xl bg-opacity-70 mt-3 text-[12.5px]">
                                <div>
                                    <span>Tên khách hàng:</span>
                                    {" "}
                                    <span>Tên khách hàng:</span>
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
                                <div>
                                    <span>Trạng thái vận chuyên:</span>
                                    {" "}
                                    <span>{hoaDon?.trangThaiVanChuyen}</span>
                                </div>
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
                            <div className="shadow-md rounded-xl text-[12.5px] py-4 px-2 ">
                                <VerticalLinearStepper></VerticalLinearStepper>
                            </div>
                        </div>
                    </div>

                </div>
                {/*  */}
                <div className="mt-2 py-4 px-2">
                    <ProductInBillComponent billDetails={hoaDonChiTiets}></ProductInBillComponent>
                </div>
            </div>
        </Fragment>
    );
}

export default ConfirmBillComponent;