import { Link, Outlet } from "react-router-dom";
import { Fragment, useState } from "react";
import { NotificationsOutlined } from "@mui/icons-material";

const BaseAdminComponent = () => {
    const [isMenuExpanded, setIsMenuExpanded] = useState(true);
    const [showManagementDropdown, setShowManagementDropdown] = useState(false);

    const links = [
        {
            name: "Bán hàng",
            url: "ban-hang"
        },
    ];
    const linksManage = [
           {
            name: "Quản lý demo",
            url: "demo"
        },
        {
            name: "Quản lý sản phẩm",
            url: "san-pham"
        },
        {
            name: "Quản lý sản phẩm chi tiết",
            url: "san-pham-chi-tiet"
        },
        {
            name: "Quản lý hóa đơn",
            url: "hoa-don"
        },
        {
            name: "Quản lý khách hàng",
            url: "khach-hang"
        },
        {
            name: "Quản lý giảm giá",
            url: "giam-gia"
        },
        {
            name: "Quản lý nhân viên",
            url: "nhan-vien"
        }
    ]

    const handleToggleDropdown = () => {
        setShowManagementDropdown(!showManagementDropdown);
    };

    return (
        <Fragment>
            <div className="grid grid-cols-12 gap-10 h-screen p-4 bg-white text-black">
                {/* LEFT MENU */}
                <div className={`transition-all duration-300 ${isMenuExpanded ? 'col-span-2' : 'col-span-1'}`}>
                    {/* LOGO */}
                    <div className={`${isMenuExpanded ? 'block' : 'hidden'}`}>
                        <img className="w-40 mx-auto my-4" src="https://theme.hstatic.net/200000690725/1001078549/14/logo.png?v=418" alt="Logo"></img>
                    </div>
                    {/* Links */}
                    <div className="flex flex-col gap-3 text-sm overflow-y-auto h-screen">
                        {/* Regular links */}
                        {links.map((item, index) => (
                            <Link key={index} to={item.url} className="py-3 px-4 rounded-md text-gray-700 hover:text-black hover:bg-gray-200">
                                {item.name}
                            </Link>
                        ))}
                        {/* Dropdown menu for "Quản lý" links */}
                            <div className="relative">
                                <button
                                    onClick={handleToggleDropdown}
                                    className="py-3 px-4 rounded-md text-gray-700 hover:text-black hover:bg-gray-200 flex items-center justify-between focus:outline-none w-full"
                                >
                                    Quản lý <span className="ml-2">&#9662;</span>
                                </button>
                                {showManagementDropdown && (
                                    <div className="absolute left-0 mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden z-10">
                                        {linksManage
                                            .map((item, index) => (
                                                <Link
                                                    key={index}
                                                    to={item.url}
                                                    className="block py-2 px-4 text-gray-700 hover:text-black hover:bg-gray-200"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                    </div>
                                )}
                            </div>
                    </div>
                </div>
                {/* RIGHT MENU */}
                <div className={`${isMenuExpanded ? 'col-span-10' : 'col-span-11'}`}>
                    <div className="bg-white bg-opacity-90">
                        <div className="flex justify-between items-center gap-10 py-5">
                            <h1 className="text-2xl font-semibold">Dashboard</h1>
                            <button className="text-black">
                                <NotificationsOutlined className="text-2xl" />
                            </button>
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

export default BaseAdminComponent;
