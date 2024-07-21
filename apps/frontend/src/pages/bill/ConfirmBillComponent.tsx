import { SetStateAction, useEffect, useState } from "react";
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
import { ETrangThaiHoaDon } from "../../enum/ETrangThaiHoaDon";
import { SubmitHandler, useForm } from "react-hook-form";
import AddSPCTtoBillComponent from "./AddSPCTtoBillComponent";

const isHiddenEdit = (status: any) => {
    switch (status) {
        case ETrangThaiHoaDon.CHO_XAC_NHAN:
            return false;
        case ETrangThaiHoaDon.CHO_GIAO_HANG:
            return true;
        case ETrangThaiHoaDon.DANG_GIAO:
            return true;
        case ETrangThaiHoaDon.DA_HOAN_THANH:
            return true;
        case ETrangThaiHoaDon.DA_HUY:
            return true;
        case ETrangThaiHoaDon.DA_THANH_TOAN:
            return true;
        case ETrangThaiHoaDon.DA_XAC_NHAN:
            return true;
        default:
            return '';
    }
}



const ConfirmBillComponent = () => {
    const useParam = useParams();
    const [hoaDon, setHoaDon] = useState<HoaDonEntity>();
    const [hoaDonChiTiets, setHoaDonChiTiets] = useState<HoaDonChiTietEntity[]>([]);
    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false)

    const [isOpenEditAddress, setIsOpenEditAddress] = useState<boolean>(false)

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

    const [isOpenAddSPCT, setIsOpenAddSPCT] = useState<boolean>(false)


    return (
        <Fragment>
            <div className="overflow-auto flex flex-col gap-2">
                <div className="rounded-md border-2  p-4">
                    <div className="flex justify-between border-b border-gray-800">
                        <span className="text-[18px] font-semibold">Lịch sử hóa đơn</span>
                        {hoaDon && isOpenHistory && <HistoryBillComponent id={hoaDon?.id} onClose={setIsOpenHistory}></HistoryBillComponent>}
                        <button onClick={() => setIsOpenHistory(true)} className="text-blue-600 underline underline-offset-2 text-sm">Xem lịch sử</button>
                    </div>
                    {hoaDon && <StepperComponent hoaDon={hoaDon} refreshBill={fetchData} />}
                </div>
                <div className="rounded-md border-2 p-4">
                    <div className="border-b border-gray-800 flex justify-between">
                        <span className="text-[18px] font-semibold ">Thông tin hóa đơn - {hoaDon?.loaiHoaDon}</span>
                        <button hidden={isHiddenEdit(hoaDon?.trangThai || "") || false} onClick={() => setIsOpenEditAddress(true)} className="text-blue-600 underline underline-offset-2 text-sm">Chỉnh sửa</button>
                    </div>
                    {hoaDon && <ThongTinDonHangComponent hoaDon={hoaDon} />}
                </div>
                <div className="rounded-md border-2  p-4">
                    <div className="flex justify-between items-center border-b border-gray-800">
                        <span className="text-[18px] font-semibold">Phí thanh toán</span>
                        {hoaDon && isOpenEditAddress && <FormEditAddress fetchData={fetchData} hoaDon={hoaDon} setIsOpenEditAddress={setIsOpenEditAddress} />}
                    </div>
                    {hoaDon && <ExportBillComponent hoaDon={hoaDon} refreshBill={fetchData} />}
                </div>
                <div className="rounded-md border-2 p-4">
                    <div className="flex justify-between items-center border-b border-gray-800">
                        <span className="text-[18px] font-semibold">Danh sách Sản phẩm</span>
                        <button onClick={() => setIsOpenAddSPCT(true)} hidden={isHiddenEdit(hoaDon?.trangThai || "") || false} className="text-blue-600 underline underline-offset-2 text-sm">Thêm sản phẩm</button>
                    </div>
                    <ProductInBillComponent billDetails={hoaDonChiTiets} refreshBill={fetchData}></ProductInBillComponent>
                </div>
                {/* Dialog */}
                {isOpenAddSPCT && <AddSPCTtoBillComponent hoaDon={hoaDon} refresh={fetchData} setIsOpenAddSPCT={setIsOpenAddSPCT}></AddSPCTtoBillComponent>}
            </div>
        </Fragment>
    );
}

export default ConfirmBillComponent;



interface IFormInput {
    id: number
    tenNguoiNhan: string
    soDienThoaiNhan: string
    diaChiNhan: string
}


const FormEditAddress = ({ setIsOpenEditAddress, hoaDon, fetchData }: { setIsOpenEditAddress: React.Dispatch<SetStateAction<boolean>>, hoaDon: HoaDonEntity, fetchData: () => void }) => {
    const { register, handleSubmit, setValue, getValues } = useForm<IFormInput>({
        defaultValues: {
            tenNguoiNhan: hoaDon?.tenNguoiNhan,
            soDienThoaiNhan: hoaDon?.soDienThoaiNhan,
            diaChiNhan: hoaDon?.diaChiNhan,
        },
    })

    useEffect(() => {
        setValue("id", hoaDon?.id)
        setValue("tenNguoiNhan", hoaDon?.tenNguoiNhan)
        setValue("soDienThoaiNhan", hoaDon?.soDienThoaiNhan)
        setValue("diaChiNhan", hoaDon?.diaChiNhan)
    }, [hoaDon])


    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data)
        const url = `/api/bills/update-address/${hoaDon.id}?tenNguoiNhan=${getValues("tenNguoiNhan")}&soDienThoaiNhan=${getValues("soDienThoaiNhan")}&diaChiNhan=${getValues("diaChiNhan")}`
        await instance.post(url).then(
            function () {
                fetchData()
                setIsOpenEditAddress(false)
            }
        )
    }

    return (
        <Fragment>
            <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50 text-sm">
                <div className="flex justify-end">
                    <button onClick={() => setIsOpenEditAddress(false)}>Đóng</button>
                </div>
                <div className="bg-white border-2 shadow-md md:w-5/12 p-4 rounded-md text-black">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-2">
                            <input className="p-1 rounded-md focus:outline-none bg-gray-300 w-full" {...register("id")} hidden />
                        </div>
                        <div className="p-2">
                            <label className="text-gray-800 font-semibold">Tên người nhận</label>
                            <input className="p-1 rounded-md focus:outline-none bg-gray-300 w-full" {...register("tenNguoiNhan")} />
                        </div>
                        <div className="p-2">
                            <label className="text-gray-800 font-semibold">Số điện thoại người nhận</label>
                            <input className="p-1 rounded-md focus:outline-none bg-gray-300 w-full" {...register("soDienThoaiNhan")} />
                        </div>
                        <div className="p-2">
                            <label className="text-gray-800 font-semibold">Địa chỉ người nhận</label>
                            <input className="p-1 rounded-md focus:outline-none bg-gray-300 w-full" {...register("diaChiNhan")} />
                        </div>
                        <div className="p-2">
                            <button className="p-1 rounded-md focus:outline-none bg-indigo-300 w-full" >Xác nhận</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )

}