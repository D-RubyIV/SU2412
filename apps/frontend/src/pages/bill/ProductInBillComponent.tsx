import { Fragment } from "react/jsx-runtime";
import { FC } from "react";
import { HoaDonChiTietEntity } from "../../types/HoaDonChiTietEntity";

interface Props {
    billDetails: HoaDonChiTietEntity[]
}

const ProductInBillComponent: FC<Props> = ({ billDetails }) => {
    return (
        <Fragment>
            <div className="overflow-auto py-4">
                <table className="table-auto w-full text-[14px]">
                    <thead className="bg-indigo-300">
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

                        </tr>
                    </thead>
                    <tbody>
                        {
                            billDetails.length > 0 && billDetails.map((item, index) => (
                                <tr key={index} className="bg-indigo-200">
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <img className="w-16 object-cover" src="https://product.hstatic.net/200000690725/product/fstp003-wh-7_53580331133_o_208c454df2584470a1aaf98c7e718c6d_master.jpg"></img>
                                        </div>
                                    </td>
                                    <td>{item.sanPhamChiTiet.ma}</td>
                                    <td>{item.sanPhamChiTiet.sanPham.ten}</td>
                                    <td>{item.sanPhamChiTiet.mauSac.ten}</td>
                                    <td>{item.sanPhamChiTiet.chiTietChatLieu.chatLieu.ten}</td>
                                    <td>{item.sanPhamChiTiet.chiTietXuatXu.ten}</td>
                                    <td>{item.soLuong}</td>
                                    <td>{item.sanPhamChiTiet.gia.toLocaleString("vi-VN")} vnd</td>
                                    <td>{(item.soLuong * item.sanPhamChiTiet.gia).toLocaleString("vi-VN")} vnd</td>
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