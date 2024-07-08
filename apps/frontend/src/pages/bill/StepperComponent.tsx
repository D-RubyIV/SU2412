import { useEffect, useState, Fragment } from "react";
import { format } from "date-fns";
import { Cancel, CarCrash, CheckCircle, ConfirmationNumberOutlined, Payment, Sync, SyncAltOutlined } from "@mui/icons-material";
import LichSuDatHang from "../../types/LichSuDatHangEntity";
import { ETrangThaiHoaDon } from "../../enum/ETrangThaiHoaDon";
import { HoaDonEntity } from "../../types/HoaDonEntity";
import { instance } from "../../axios/instance";


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

    const updateStatus = async (status: string) => {
        try {
            const response = await instance.post(`/api/bills/update-status/${hoaDon.id}?status=${status}`);
            if (response.status === 200) {
                fetchData();
                refreshBill();
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
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
                {renderContentButton(trangThai, updateStatus)}
            </div>
        </Fragment>
    );
};

export default StepperComponent;

const renderContentButton = (status: string, updateStatus: (status: string) => void) => {
    switch (status) {
        case ETrangThaiHoaDon.CHO_XAC_NHAN:
            return (
                <div>
                    {renderButton(ETrangThaiHoaDon.DA_HUY, updateStatus, "Hủy đơn hàng")}
                    {renderButton(ETrangThaiHoaDon.DA_XAC_NHAN, updateStatus, "Xác nhận đơn hàng")}
                </div>
            );
        case ETrangThaiHoaDon.DA_XAC_NHAN:
            return (
                <div>
                    {renderButton(ETrangThaiHoaDon.CHO_XAC_NHAN, updateStatus, "Chuyển về chờ xác nhận")}
                    {renderButton(ETrangThaiHoaDon.CHO_GIAO_HANG, updateStatus, "Chuyển bên giao hàng")}
                </div>
            );
        case ETrangThaiHoaDon.CHO_GIAO_HANG:
            return (
                <div>
                    {renderButton(ETrangThaiHoaDon.DA_XAC_NHAN, updateStatus, "Quay về xác nhận đơn hàng")}
                    {renderButton(ETrangThaiHoaDon.DANG_GIAO, updateStatus, "Xác nhận đang giao đơn hàng")}
                </div>
            );
        case ETrangThaiHoaDon.DANG_GIAO:
            return (
                <div>
                    {renderButton(ETrangThaiHoaDon.CHO_GIAO_HANG, updateStatus, "Quay về đang giao đơn hàng")}
                    {renderButton(ETrangThaiHoaDon.DA_THANH_TOAN, updateStatus, "Xác nhận đã thanh toán")}
                </div>
            );
        case ETrangThaiHoaDon.DA_THANH_TOAN:
            return renderButton(ETrangThaiHoaDon.DA_HOAN_THANH, updateStatus, "Chuyển đã hoàn thành");
        case ETrangThaiHoaDon.DA_HOAN_THANH:
            return <button>Hoàn thành</button>;
        case ETrangThaiHoaDon.DA_HUY:
            return <div>Đã hủy</div>;
        default:
            return <div>Unknown Status</div>;
    }
};

const renderButton = (status: string, updateStatus: (status: string) => void, label: string) => (
    <button className="bg-indigo-200 p-1 px-2 text-sm rounded-md me-4" onClick={() => updateStatus(status)}>
        {label}
    </button>
);
