import { Fragment } from "react/jsx-runtime";
import { ChangeEvent, useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { instance } from "../../axios/instance";
import PagenateComponent from "../../views/admin/pagination/PagenateComponent";
import { HoaDonChiTietEntity } from "../../types/HoaDonChiTietEntity";
import { HoaDonEntity } from "../../types/HoaDonEntity";
import { Input } from "../../components/input";
import { CloseOutlined, Search } from "@mui/icons-material";
import MinimumDistanceSlider from "../../components/slider/MinimumDistanceSlider";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// stt, mahoadon, manhanvien, tên khach hang, 

interface TypeBill {
    name: string,
    code: string,
    color: string
}

const typeBills: TypeBill[] = [
    {
        name: "Tất cả",
        code: "",
        color: "#000000"
    },
    {
        name: "Chờ xác nhận",
        code: "CHO_XAC_NHAN",
        color: "#ffcc00"
    },
    {
        name: "Đã xác nhận",
        code: "DA_XAC_NHAN",
        color: "#ffcc00"
    },
    {
        name: "Chờ giao hàng",
        code: "CHO_GIAO_HANG",
        color: "#3399ff"
    },
    {
        name: "Đang giao",
        code: "DANG_GIAO",
        color: "#33cc33"
    },

    {
        name: "Đã thanh toán",
        code: "DA_THANH_TOAN",
        color: "#339933"
    },
    {
        name: "Đã hoàn thành",
        code: "DA_HOAN_THANH",
        color: "#66ff99"
    },
    {
        name: "Đã hủy",
        code: "DA_HUY",
        color: "#ff3300"
    },
];


const ManageBillComponent = () => {
    const [bills, setBills] = useState<HoaDonEntity[]>([])
    const [limit, setLimit] = useState<number>(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<TypeBill>(typeBills[0]);
    const [loaiHoaDon, setloaiHoaDon] = useState<string>("")
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [key, setKey] = useState<string>("")

    const [minMax, setMinMax] = useState<number[]>([0, 100000000])

    useEffect(() => {
        console.log(minMax);
    }, [minMax])


    const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    const handleBlur = () => {
        console.log('Search keyword on blur:');
        // Thực hiện hành động tìm kiếm ở đây, nếu muốn.
    };

    const fetchData = async () => {
        await instance.get(`api/bills/filter?type=${loaiHoaDon}&status=${selectedStatus.code}&limit=${limit}&offset=${currentPage - 1}&startDate=${startDate}&endDate=${endDate}&sMoney=${minMax[0]}&eMoney=${minMax[1]}&key=${key}`).then(function (response) {
            if (response.status === 200) {
                setBills(response.data.content)
                setTotalPages(response.data.totalPages)
                if (response.data.totalPages < currentPage) {
                    setCurrentPage(1)
                }
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [currentPage, limit, selectedStatus, startDate, endDate, loaiHoaDon, minMax, key])

    return (
        <Fragment>

            {
                isOpenModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50">
                        <div className="bg-white border-2 shadow-md w-6/12 p-4 rounded-md text-black">
                            <div className="flex justify-between items-center py-2 border-b-4">
                                <span className="text-xl font-semibold">Bộ lọc</span>
                                <button onClick={() => setIsOpenModal(false)}><CloseOutlined /></button>
                            </div>
                            <div>
                                <div className="w-full">
                                    <label className="text-gray-600">Khoảng tiền</label>
                                    <MinimumDistanceSlider currentValue={minMax} min={0} max={100000000} setMinMax={setMinMax}></MinimumDistanceSlider>
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-600">Ngày tạo</label>
                                <div className="grid grid-cols-2 gap-10 py-4">

                                    <div className="flex gap-2 justify-between">
                                        <label className="text-sm">Từ:</label>
                                        <input
                                            type="datetime-local"
                                            className="text-[13.5px] bg-transparent"
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                        />
                                    </div>
                                    <div className="flex gap-2 justify-between items-center">
                                        <label className="text-sm">Đến:</label>
                                        <input
                                            type="datetime-local"
                                            className="text-[13.5px] bg-transparent"
                                            value={endDate}
                                            onChange={handleEndDateChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <label className="text-gray-600">Khác</label>
                            <div className="grid grid-cols-2 gap-10 py-4">
                                <div className="flex gap-2 justify-between items-center">
                                    <label className="text-sm">Loại hóa đơn: </label>
                                    <select className="bg-transparent" onChange={(el) => setloaiHoaDon(el.target.value)}>
                                        <option value={""}>Tất cả</option>
                                        <option value={"ONLINE"}>Online</option>
                                        <option value={"TAI_QUAY"}>Tại quầy</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <div>
                <div>
                    <span className="text-xl font-semibold">Danh sách hóa đơn</span>
                </div>
                <div className="flex justify-between gap-3 items-center border-2">
                    <div className="flex items-center justify-between gap-2 border-2 border-gray-200 w-full p-2">
                        <input onBlur={handleBlur} onChange={(el) => setKey(el.target.value)} className="text-sm w-full outline-none" placeholder="Nhập từ khóa tìm kiếm"></input>
                        <button className="hover:bg-gray-500 rounded-full"><Search /></button>
                    </div>
                    <div className="p-2">
                        <button onClick={() => setIsOpenModal(true)}><FilterAltIcon /></button>
                    </div>

                </div>

                <div className="flex justify-evenly py-1 border-2">
                    {Object.values(typeBills).map((type, index) => (
                        <button
                            onClick={() => setSelectedStatus(type)}
                            className={`text-sm underline-transition whitespace-nowrap transition-colors duration-300 ease-in-out uppercase py-1.5 tracking-tighter ${type === selectedStatus ? 'underline-transition-active text-gray-900' : 'text-gray-400'}`} key={index}>{type.name}</button>
                    ))}
                </div>


                <div className="overflow-auto h-[60vh]">
                    <table className="table-auto text-[13px] min-w-full text-left rounded-md">
                        <thead className="text-[13.5px] sticky top-0 bg-white z-1">
                            <tr className={`border-2`}>
                                <th>#</th>
                                <th>Mã HD</th>
                                <th>Mã NV</th>
                                <th>Mã KH</th>
                                <th>Tên KH</th>
                                <th>Loại hóa đơn</th>
                                <th>Tổng tiền</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(bills) && bills.map((item, index) => (
                                <tr key={index} className={`border-2`}>
                                    <td className="py-3">{index + 1}</td>
                                    <td className="py-3">{item.ma}</td>
                                    <td className="py-3">{item.nhanVien?.ma || "null"}</td>
                                    <td className="py-3">{item.khachHang?.ma || "null"}</td>
                                    <td className="py-3">{item.khachHang?.hoTen || "null"}</td>
                                    <td className="py-3">{item.loaiHoaDon}</td>
                                    <td className="py-3">{item.tongTien.toLocaleString("vi-VN")}</td>
                                    <td className="py-3">{format(item.createAt.toString(), 'HH:mm dd/MM/yyyy')}</td>
                                    {/* <td className="py-2">{format(item.ngayDatHang.toString(), 'HH:m dd/MM/yyyy')}</td> */}

                                    <td className={`py-2`}>
                                        <span className={`w-full font-semibold`}>
                                            {item.trangThai}
                                        </span>
                                    </td>
                                    {/* <td className="py-2">{item.giaoHang ? "Có" : "Không"}</td> */}
                                    <td>
                                        <Link to={`${item.id}`} className="underline underline-offset-2 text-blue-500">Xem chi tiết</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="py-3 border-2">
                    <PagenateComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} setLimit={setLimit} />
                </div>
            </div>
        </Fragment >
    );
}

export default ManageBillComponent;
// http://localhost:8080/api/bills?startDate=2021-01-01T00:00:00&endDate=2024-12-31T23:59:59
// http://localhost:8080/api/bills?startDate=2024-07-05T13:25