import { Fragment } from "react/jsx-runtime";
import { FC } from "react";
import { HoaDonChiTietEntity } from "../../types/HoaDonChiTietEntity";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { instance } from "../../axios/instance";

interface Props {
    billDetails: HoaDonChiTietEntity[];
    refreshBill: () => void;
}

const ProductInBillComponent: FC<Props> = ({ billDetails, refreshBill }) => {


    const handleDelete = async (idHDCT: number) => {
        await instance.delete(`api/bill-details/${idHDCT}`).then(function (response) {
            if (response.status === 200) {
                refreshBill()
            }
        })
    }


    const handleIncrease = async (idHDCT: number) => {
        await instance.get(`api/bill-details/increase/${idHDCT}`).then(function (response) {
            if (response.status === 200) {
                refreshBill()
            }
        })
    }

    
    const handleDecrease = async (idHDCT: number) => {
        await instance.get(`api/bill-details/decrease/${idHDCT}`).then(function (response) {
            if (response.status === 200) {
                refreshBill()
            }
        })
    }

    return (
        <Fragment>
            <div className="overflow-auto py-4">
                <table className="table-auto w-full text-[14px]">
                    <thead className="border">
                        <tr>
                            <th>No</th>
                            <th>Hình ảnh</th>
                            <th>Mã</th>
                            <th>Sản phẩm</th>
                            <th>Màu</th>
                            <th>Kích thước</th>
                            <th>Xuất xứ</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Tổng tiền</th>
                            <th>Hành động</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            billDetails.length > 0 && billDetails.map((item, index) => (
                                <tr key={index} className="border">
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <img className="w-16 object-cover" src="https://product.hstatic.net/200000690725/product/fstp003-wh-7_53580331133_o_208c454df2584470a1aaf98c7e718c6d_master.jpg"></img>
                                        </div>
                                    </td>
                                    <td>{item.sanPhamChiTiet.ma}</td>
                                    <td>{item.sanPhamChiTiet.sanPham.ten}</td>
                                    <td>{item.sanPhamChiTiet.mauSac.ten}</td>
                                    <td>{item.sanPhamChiTiet.kichThuoc.ten}</td>
                                    <td>{item.sanPhamChiTiet.nuocSanXuat.ten}</td>
                                    <td>
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => handleIncrease(item.id)} className="flex justify-center w-5 h-5 font-semibold rounded-full items-center p-1 bg-gray-300 aspect-square">+</button>
                                            <label>{item.soLuong}</label>
                                            <button onClick={() => handleDecrease(item.id)} className="flex justify-center w-5 h-5 font-semibold rounded-full items-center p-1 bg-gray-300 aspect-square">-</button>
                                        </div>
                                    </td>
                                    <td>{item.sanPhamChiTiet.gia.toLocaleString("vi-VN")} vnd</td>
                                    <td>{(item.soLuong * item.sanPhamChiTiet.gia).toLocaleString("vi-VN")} vnd</td>
                                    <td>
                                        <div className="">
                                            <button onClick={() => handleDelete(item.id)}><DeleteOutline></DeleteOutline></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            ||
                            (
                                <tr>
                                    <td colSpan={100}>
                                        <span className="text-xl font-thin">Không có bất kì sản phẩm nào</span>
                                    </td>
                                </tr>
                            )

                        }
                    </tbody>
                </table>

            </div>

        </Fragment>
    );
}

export default ProductInBillComponent;