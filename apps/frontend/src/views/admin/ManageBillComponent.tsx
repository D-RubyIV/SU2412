import { Breadcrumbs, Button, Input, InputAdornment, InputLabel, Link } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import { Typography } from "antd";
import { AccountCircle, PlusOneOutlined, SearchOutlined } from "@mui/icons-material";
import { instance } from "../../axios/instance";
import { useEffect, useState } from "react";
import HoaDonEntity from "../../entity/HoaDonEntity";
import { EyeDropperIcon, EyeIcon } from "@heroicons/react/24/solid";
import PagenateComponent from "./pagination/PagenateComponent";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}




const ManageBillComponent = () => {
    const [bills, setBills] = useState<HoaDonEntity[]>([])
    const [limit, setLimit] = useState<number>(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        await instance.get(`api/bills?limit=${limit}&offset=${currentPage}`).then(function (reponse) {
            if (reponse.status === 200) {
                setBills(reponse.data.content)
                setTotalPages(reponse.data.totalPages)
            }
        })
    }
    useEffect(() => {
        console.log(currentPage)
    }, [currentPage])


    useEffect(() => {
        fetchData()
    }, [currentPage])

    return (
        <Fragment>
            <div>
                <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Trang chủ
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/manage"
                        >
                            Quản lý
                        </Link>
                        <Typography color="text.primary">Hóa đơn</Typography>
                    </Breadcrumbs>
                </div>

                <div>
                    {/* Menu */}
                    <div className="flex gap-5 py-2">
                        <div>
                            <input className="p-2 focus:border-none" placeholder="Nhập từ khóa tại đầy"></input>
                        </div>
                        <div>
                            <SearchOutlined></SearchOutlined>
                        </div>
                    </div>
                    {/* Bảng */}
                    <div className="overflow-auto">
                        <table className="table-auto w-full text-[12px] text-left rounded-md text-nowrap">
                            <thead className="text-[13.5px]">
                                <tr className="">
                                    <th>#</th>
                                    <th>Mã</th>
                                    <th>Tên nhân viên</th>
                                    <th>Số diện thoại</th>
                                    <th>Tổng tiền</th>
                                    <th>Ngày tạo</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Array.isArray(bills) && bills.map((item, index) => (
                                        <tr key={index} className={`${index % 2 === 0 ? "bg-gray-200" : ""} `}>
                                            <td className="py-2">{index + 1}</td>
                                            <td className="py-2">{item.ma}</td>
                                            <td className="py-2">{item.nhanVien?.soDienThoai || "null"}</td>
                                            <td className="py-2">{item.soDienThoaiNhan}</td>
                                            <td className="py-2">{item.tongTien}</td>
                                            <td className="py-2">{item.ngayDatHang}</td>
                                            <td className="py-2">{item.trangThai}</td>
                                            <td>
                                                <button>Xem</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="py-3 flex justify-between">
                            <div>Limit<input type="number" className="w-10 border"></input></div>
                            <PagenateComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}></PagenateComponent>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ManageBillComponent;