import { SetStateAction, useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { HoaDonEntity } from "../../types/HoaDonEntity";
import { ETrangThaiHoaDon } from "../../enum/ETrangThaiHoaDon";
import { instance } from "../../axios/instance";
import { format } from "date-fns";
import { CloseOutlined } from "@mui/icons-material";

type BillHistory = {
    id: number,
    createBy: string;
    updateBy: string;
    createAt: string;
    updateAt: string;
    hoaDon: HoaDonEntity,
    trangThaiDonHang: ETrangThaiHoaDon,
    note: string
}

const HistoryBillComponent = ({ id, onClose }: { id: number, onClose: React.Dispatch<SetStateAction<boolean>> }) => {
    const [billHistorys, setBillHistorys] = useState<BillHistory[]>()

    const fecthData = async () => {
        await instance.get(`api/history-bills/inBill/${id}`).then(
            function (response) {
                setBillHistorys(response.data);
            }
        )
    }
    useEffect(() => {
        fecthData();
    }, [])

    const getStatusClassName = (status: ETrangThaiHoaDon) => {
        switch (status) {
            case ETrangThaiHoaDon.CHO_XAC_NHAN:
                return 'bg-yellow-200';
            case ETrangThaiHoaDon.CHO_GIAO_HANG:
                return 'bg-orange-200';
            case ETrangThaiHoaDon.DANG_GIAO:
                return 'bg-blue-200';
            case ETrangThaiHoaDon.DA_HOAN_THANH:
                return 'bg-green-200';
            case ETrangThaiHoaDon.DA_HUY:
                return 'bg-red-200';
            case ETrangThaiHoaDon.DA_THANH_TOAN:
                return 'bg-purple-200';
            case ETrangThaiHoaDon.DA_XAC_NHAN:
                return 'bg-lightgreen-200';
            default:
                return '';
        }
    }

    return (
        <Fragment>
            <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50">
                <div className="bg-white border-2 shadow-md w-8/12 p-4 rounded-md text-black">
                    <div className="flex justify-between items-center py-2 border-b-4">
                        <span className="text-xl font-semibold">Lịch sử hóa đơn</span>
                        <button onClick={() => onClose(false)}><CloseOutlined /></button>
                    </div>
                    <div className="">
                        <table className="table-auto w-full text-sm">
                            <thead className="bg-gray-300">
                                <tr className="">
                                    <th>No</th>
                                    <th>Thời gian</th>
                                    <th>Trạng thái hóa đơn</th>
                                    <th>Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billHistorys?.map((item, index) => (
                                    <Fragment key={index}>
                                        <tr className={getStatusClassName(item.trangThaiDonHang)}>
                                            <td>{index + 1}</td>
                                            <td>{format(new Date(item.createAt), 'HH:mm dd/MM/yyyy')}</td>
                                            <td >
                                                <p>{item.trangThaiDonHang}</p>
                                            </td>
                                            <td>{item.note}</td>
                                        </tr>
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default HistoryBillComponent;

