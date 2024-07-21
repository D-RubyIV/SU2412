import { FC, SetStateAction, useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { SanPhamChiTietEntity } from "../../types/SanPhamChiTietEntity";
import { instance } from "../../axios/instance";
import { AddOutlined, CloseOutlined } from "@mui/icons-material";
import { HoaDonEntity } from "../../types/HoaDonEntity";

interface IProps {
    setIsOpenAddSPCT: React.Dispatch<React.SetStateAction<boolean>>;
    hoaDon: HoaDonEntity,
    refresh: ()=>void
}

const AddSPCTtoBillComponent: FC<IProps> = ({ setIsOpenAddSPCT, hoaDon, refresh }) => {
    const [quantity, setQuantity] = useState<number>(1)
    const [isOpenQuantity, setIsOpenQuantity] = useState<boolean>(false)
    const [spctSelected, setSpctSelected] = useState<SanPhamChiTietEntity>()
    const [listSPCT, setlistSPCT] = useState<SanPhamChiTietEntity[]>([])

    const handleSelectSPCT = (spct: SanPhamChiTietEntity) => {
        setQuantity(1)
        setIsOpenQuantity(true)
        setSpctSelected(spct)
    }

    const handleAddToBill = async () => {
        if (spctSelected) {
            const url = `api/bill-details/add?idHoaDon=${hoaDon.id}&idSPCT=${spctSelected.id}&soLuong=${quantity}`
            await instance.post(url).then(function (response) {
                if (response.status === 200) {
                    setIsOpenQuantity(false)
                    setIsOpenAddSPCT(false)
                    refresh();
                }
            })
        }

    }

    const findAll = async () => {
        instance.get("api/spct").then(function (response) {
            if (response.status === 200) {
                setlistSPCT(response.data)
            }
        })
    }
    useEffect(() => {
        findAll();
    }, [])

    return (
        <Fragment>
            <div className="z-10 text-sm p-4 rounded-md bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5  h-4/5 ring-1">
                <div className="h-full flex flex-col">
                    <div className="flex justify-between pb-2">
                        <label className="text-[18px] font-semibold ">Danh sách sản phẩm</label>
                        <button onClick={() => setIsOpenAddSPCT(false)}><CloseOutlined></CloseOutlined></button>
                    </div>
                    <div className="overflow-auto">
                        <table className="w-full table-fixed mb-2">
                            <thead>
                                <tr>
                                    <th>Mã</th>
                                    <th>Hình ảnh</th>
                                    <th>Tên</th>
                                    <th>Màu</th>
                                    <th>Kích cỡ</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listSPCT.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.ma}</td>
                                            <td>
                                                <div className="flex justify-center">
                                                    <img className="w-16 object-cover" src="https://product.hstatic.net/200000690725/product/fstp003-wh-7_53580331133_o_208c454df2584470a1aaf98c7e718c6d_master.jpg"></img>
                                                </div>
                                            </td>
                                            <td>{item.sanPham.ten}</td>
                                            <td>{item.mauSac.ten}</td>
                                            <td>{item.kichThuoc.ten}</td>
                                            <th>{item.gia.toLocaleString("vi-VN")}</th>
                                            <td>{item.soLuong}</td>
                                            <td><button onClick={() => handleSelectSPCT(item)}><AddOutlined></AddOutlined></button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={`z-11 text-sm font-semibold p-2 rounded-md bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5  h-2/5 ring-1 ${isOpenQuantity ? '' : 'hidden'}`}>
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <label>Xác nhận</label>
                            <button onClick={() => setIsOpenQuantity(false)}><CloseOutlined></CloseOutlined></button>
                        </div>
                        <div className="h-full">
                            {
                                spctSelected &&
                                (
                                    <Fragment>
                                        <div className="">
                                            <div className="grid grid-cols-4 py-2">
                                                <div className="flex justify-center col-span-1">
                                                    <img className="w-36 object-cover" src="https://product.hstatic.net/200000690725/product/fstp003-wh-7_53580331133_o_208c454df2584470a1aaf98c7e718c6d_master.jpg"></img>
                                                </div>
                                                <div className="col-span-3">
                                                    <div>
                                                        <div>
                                                            <label>Tên sản phẩm: </label>
                                                            <label>{spctSelected.sanPham.ten}</label>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-1">
                                                        <div>
                                                            <label>Tồn kho: </label>
                                                            <label>{spctSelected.soLuong}</label>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 items-center">
                                                        <button onClick={() => setQuantity(quantity + 1)} className="flex justify-center w-5 h-5 font-semibold rounded-full items-center p-1 bg-gray-300 aspect-square">+</button>
                                                        <label>{quantity}</label>
                                                        <button onClick={() => { quantity > 1 && setQuantity(quantity - 1) }} className="flex justify-center w-5 h-5 font-semibold rounded-full items-center p-1 bg-gray-300 aspect-square">-</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                            <button onClick={() => handleAddToBill()} className="w-full mt-8 ring-indigo-500 ring-1 rounded-sm">Xác nhận</button>
                                        </div>
                                    </Fragment>
                                )

                            }
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default AddSPCTtoBillComponent;