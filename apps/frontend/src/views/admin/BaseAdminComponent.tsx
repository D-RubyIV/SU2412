import { Link, Outlet } from "react-router-dom";
import { Fragment, useState } from "react";
import { NotificationsOutlined, ShoppingCartOutlined, InventoryOutlined, PeopleOutline, LocalOfferOutlined, ReceiptOutlined, ExpandLessOutlined, ExpandMoreOutlined, ManageHistory, MenuOutlined, ReportRounded, ReportOutlined } from "@mui/icons-material"; // Import necessary icons
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

type LinkEntity = {
    name: string,
    url: string,
    icon: any
}

const BaseAdminComponent = () => {
    const links: LinkEntity[] = [
        {
            name: "Quản lý demo",
            url: "demo",
            icon: <InventoryOutlined />
        },
        {
            name: "Quản lý sản phẩm",
            url: "san-pham",
            icon: <InventoryOutlined />
        },
        {
            name: "Quản lý sản phẩm chi tiết",
            url: "san-pham-chi-tiet",
            icon: <InventoryOutlined />
        },
        {
            name: "Quản lý hóa đơn",
            url: "hoa-don",
            icon: <ReceiptOutlined />
        },
        {
            name: "Quản lý khách hàng",
            url: "khach-hang",
            icon: <PeopleOutline />
        },
        {
            name: "Quản lý khuyen mai",
            url: "khuyen-mai",
            icon: <LocalOfferOutlined />
        },
        {
            name: "Quản lý nhân viên",
            url: "nhan-vien",
            icon: <PeopleOutline />
        }
    ];
    const [isOpen, setIsOpen] = useState(true)

    return (
        <Fragment>
            <div className="flex h-screen p-4 bg-white gap-5">
                {/* LEFT MENU */}
                <div className={`${isOpen ? "w-[15%]" : "w-[5%] items-center"} shadow-2xl transition-all rounded-md duration-500 flex flex-col`}>
                    <div className={`${isOpen ? "" : "hidden"} h-20 flex justify-center items-center`}>
                        <img className="object-cover h-10" src="https://theme.hstatic.net/200000690725/1001078549/14/logo.png?v=418" alt="Logo"></img>
                    </div>
                    <div className={`${isOpen ? "hidden" : ""} h-20 flex justify-center items-center`}>
                        <img className="object-cover aspect-square w-20" src="https://lzd-img-global.slatic.net/g/p/d5034dd3d9cd35bab1db1a93e1605b8f.jpg_720x720q80.jpg" alt="Logo"></img>
                    </div>
                    {/* MENU */}
                    <Link to={"thong-ke"} className={`${isOpen ? "" : "shadow-xl rounded-md"} p-4 `}>
                        <ReportOutlined />
                        <span className={`${isOpen ? "text-center" : "hidden"}`}>Thống kê</span>
                    </Link>
                    <Link to={"ban-hang"} className={`${isOpen ? "" : "shadow-xl rounded-md"} p-4 `}>
                        <ShoppingCartOutlined />
                        <span className={`${isOpen ? "text-center" : "hidden"}`}>Bán hàng</span>
                    </Link>
                    <Dropdown label="Quản lý" links={links} icon={<ManageHistory></ManageHistory>}></Dropdown>

                </div>
                {/* RIGHT MENU */}
                <div className={`${isOpen ? "w-[85%]" : "w-[95%]"} transition-all duration-500 shadow-2xl px-14 rounded-md`}>
                    <div className="bg-white flex items-center">
                        <div className="flex items-center gap-10 h-20 justify-between w-full">
                            <div className="flex gap-4">
                                <div>
                                    <button onClick={() => setIsOpen(!isOpen)}><MenuOutlined /></button>
                                </div>
                                <div>
                                    <p className="text-[20px] font-semibold">Dashboard</p>
                                </div>
                            </div>
                            <div>
                                <button className="text-black">
                                    <NotificationsOutlined className="text-2xl" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <Outlet />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

const Dropdown = ({ links, label, icon }: { links: LinkEntity[], label: string, icon: any }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Fragment>
            <div className="text-left">
                <div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full justify-between flex hover:bg-gray-200 p-2 rounded-md"
                    >

                        <span className="flex gap-2">{icon}{label}</span>
                        {isOpen ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
                    </button>
                </div>
                <div
                    className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                >
                    {links.map((item, index) => (
                        <Link
                            key={index}
                            to={item.url}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default BaseAdminComponent;
