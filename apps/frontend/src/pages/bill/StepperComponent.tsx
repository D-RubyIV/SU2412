import { useEffect, useState, Fragment } from "react";
import { format } from "date-fns";
import { Cancel, CarCrash, CheckCircle, CloseOutlined, ConfirmationNumberOutlined, Payment, Sync, SyncAltOutlined } from "@mui/icons-material";
import LichSuDatHang from "../../types/LichSuDatHangEntity";
import { ETrangThaiHoaDon } from "../../enum/ETrangThaiHoaDon";
import { HoaDonEntity } from "../../types/HoaDonEntity";
import { instance } from "../../axios/instance";
import { toast } from "react-toastify";


const maskTrangThaiHoaDon = [
    { code: ETrangThaiHoaDon.CHO_XAC_NHAN, icon: <Sync />, color: "#ff9800" }, // orange
    { code: ETrangThaiHoaDon.DA_XAC_NHAN, icon: <ConfirmationNumberOutlined />, color: "#ff9822" }, // orange
    { code: ETrangThaiHoaDon.CHO_GIAO_HANG, icon: <SyncAltOutlined />, color: "#2196f3" }, // blue
    { code: ETrangThaiHoaDon.DANG_GIAO, icon: <CarCrash />, color: "#f44336" }, // red
    { code: ETrangThaiHoaDon.DA_HOAN_THANH, icon: <CheckCircle />, color: "#4caf50" }, // green
    { code: ETrangThaiHoaDon.DA_HUY, icon: <Cancel />, color: "#9e9e9e" }, // grey
    { code: ETrangThaiHoaDon.DA_THANH_TOAN, icon: <Payment />, color: "#3f51b5" } // indigo
];

const StepperComponent = ({ hoaDon, refreshBill }: { hoaDon: HoaDonEntity, refreshBill: () => Promise<void> }) => {
    const [lichSuDonHangs, setLichSuDonHangs] = useState<LichSuDatHang[]>([]);
    const [trangThai, setTrangThai] = useState<string>(hoaDon.trangThai);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentStatusForUpdate, setCurrentStatusForUpdate] = useState<ETrangThaiHoaDon>()
    const [note, setNote] = useState<string>("")

    useEffect(() => {
        setTrangThai(hoaDon.trangThai);
    }, [hoaDon.trangThai]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await instance.get(`api/history-bills/inBill/${hoaDon.id}`);
            setLichSuDonHangs(response.data);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };


    const handleUpdateStepBill = (status: ETrangThaiHoaDon) => {
        setIsOpen(true);
        setCurrentStatusForUpdate(status);
        setNote("")
    }

    const onSubmitStatus = async (status: string) => {
        try {
            const response = await instance.post(`/api/bills/update-status/${hoaDon.id}?status=${status}&note=${note}`);
            if (response.status === 200) {
                fetchData();
                refreshBill();
                toast.success("Thay đổi trạng thái thành công")
            }
        } catch (error) {
            console.log("Failed to update status", error);
        }
        
        setIsOpen(false)
    };

    return (
        <Fragment>
            <div className="overflow-auto">
                <div className="px-4 py-4 flex gap-16 justify-center ">
                    {lichSuDonHangs.length > 0 && lichSuDonHangs.map((item, index) => (
                        <Fragment key={index}>
                            <div className="text-center flex justify-center flex-col items-center text-[12.5px] min-w-20">
                                <div className="w-20 aspect-square flex items-center bg-green-600 rounded-full ring-1 ring-blue-200 ring-offset-4 justify-center text-sm">
                                    {maskTrangThaiHoaDon
                                        .filter(mask => mask.code === item.trangThaiDonHang)
                                        .map(mask => (
                                            <div key={mask.code} style={{ color: mask.color }}>
                                                {mask.icon}
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="mt-2"><span>{item.trangThaiDonHang}</span></div>
                                <div>
                                    <span>{item.createAt && format(new Date(item.createAt), 'HH:mm dd/MM/yyyy')}</span>
                                </div>
                            </div>
                        </Fragment>
                    ))
                        ||
                        (<div className="px-4 py-4 flex gap-16 justify-center">
                            <span className="text-xl font-thin">Hiện không có lịch sử</span>
                        </div>)
                    }
                </div>
            </div>
            <div>
                {
                    hoaDon.trangThai === ETrangThaiHoaDon.CHO_XAC_NHAN
                    && (
                        <div>
                            <button className="bg-indigo-200 p-1 px-2 text-sm rounded-md me-4" onClick={() => { handleUpdateStepBill(ETrangThaiHoaDon.DA_HUY) }}>Hủy</button>
                            <button className="bg-indigo-200 p-1 px-2 text-sm rounded-md me-4" onClick={() => { handleUpdateStepBill(ETrangThaiHoaDon.DA_XAC_NHAN) }}>Xác nhận</button>
                        </div>
                    ) ||
                    hoaDon.trangThai === ETrangThaiHoaDon.DA_XAC_NHAN
                    && (
                        <div>
                            <button className="bg-indigo-200 p-1 px-2 text-sm rounded-md me-4" onClick={() => { handleUpdateStepBill(ETrangThaiHoaDon.CHO_XAC_NHAN) }}>Quay lại</button>
                            <button className="bg-indigo-200 p-1 px-2 text-sm rounded-md me-4" onClick={() => { handleUpdateStepBill(ETrangThaiHoaDon.DANG_GIAO) }}>Xác nhận giao hàng</button>
                        </div>
                    ) ||
                    hoaDon.trangThai === ETrangThaiHoaDon.DANG_GIAO
                    && (
                        <div>
                            <button className="bg-indigo-200 p-1 px-2 text-sm rounded-md me-4" onClick={() => { handleUpdateStepBill(ETrangThaiHoaDon.DA_XAC_NHAN) }}>Quay lại</button>
                            <button className="bg-indigo-200 p-1 px-2 text-sm rounded-md me-4" onClick={() => { handleUpdateStepBill(ETrangThaiHoaDon.DA_THANH_TOAN) }}>Xác nhận thanh toán</button>
                        </div>
                    ) ||
                    hoaDon.trangThai === ETrangThaiHoaDon.DA_THANH_TOAN
                    && (
                        <div>
                            <button className="bg-indigo-200 p-1 px-2 text-sm rounded-md me-4" onClick={() => { handleUpdateStepBill(ETrangThaiHoaDon.DANG_GIAO) }}>Quay lại</button>
                            <button className="bg-indigo-200 p-1 px-2 text-sm rounded-md me-4" onClick={() => { handleUpdateStepBill(ETrangThaiHoaDon.DA_HOAN_THANH) }}>Xác nhận hoàn thành</button>
                        </div>
                    ) ||
                    hoaDon.trangThai === ETrangThaiHoaDon.DA_HOAN_THANH
                    && (
                        <div>
                            <span className="bg-indigo-200 p-1 px-2 text-sm rounded-md me-4" >Hoàn Thành</span>
                        </div>
                    ) ||
                    hoaDon.trangThai === ETrangThaiHoaDon.DA_HUY
                    && (
                        <div>
                            <span className="bg-indigo-200 p-1 px-2 text-sm rounded-md me-4" >Đã hủy</span>
                        </div>
                    )
                }
                {/* {renderContentButton(trangThai, updateStatus)} */}
            </div>
            <div>
                <Fragment>
                    {isOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50">
                            <div className="bg-white border-2 shadow-md w-5/12 p-2 rounded-md text-black">
                                <div className="flex justify-between items-center py-2 border-b-4">
                                    <span className="text-sm font-semibold">Biểu mẫu xác nhận</span>
                                    <button onClick={() => setIsOpen(false)}><CloseOutlined /></button>
                                </div>
                                <div>
                                    <textarea value={note} rows={5} className="w-full text-sm  rounded-md focus:outline-0 p-2" onChange={(el) => setNote(el.target.value)}>
                                    </textarea>
                                </div>
                                <div className="flex justify-center">
                                    {currentStatusForUpdate && <button onClick={() => onSubmitStatus(currentStatusForUpdate?.toString())} className="w-full bg-indigo-300 hover:bg-indigo-400 rounded-md p-1 text-white">Xác nhận</button>}
                                </div>
                                {/* Add any additional content here */}
                            </div>
                        </div>
                    )}
                </Fragment>
            </div>
        </Fragment>
    );
};

export default StepperComponent;