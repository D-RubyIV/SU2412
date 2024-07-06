import { Link, Outlet, useLocation } from "react-router-dom";
import { Fragment, useState } from "react";
import {
  NotificationsOutlined,
  InventoryOutlined,
  PeopleOutline,
  LocalOfferOutlined,
  ReceiptOutlined,
  ExpandLessOutlined,
  ExpandMoreOutlined,
  MenuOutlined,
  ReportOutlined,
} from "@mui/icons-material"; // Import necessary icons

type LinkEntity = {
  name: string;
  url: string;
  icon: React.ReactNode;
};

const BaseAdminComponent = () => {
  const location = useLocation();
  const links: LinkEntity[] = [
    {
      name: "Quản lý demo",
      url: "demo",
      icon: <InventoryOutlined />,
    },
    {
      name: "Sản phẩm",
      url: "san-pham",
      icon: <InventoryOutlined />,
    },
    {
      name: "Sản phẩm chi tiết",
      url: "san-pham-chi-tiet",
      icon: <InventoryOutlined />,
    },
    {
      name: "Hóa đơn",
      url: "hoa-don",
      icon: <ReceiptOutlined />,
    },
    {
      name: "Khách hàng",
      url: "khach-hang",
      icon: <PeopleOutline />,
    },
    {
      name: "Khuyến mãi",
      url: "khuyen-mai",
      icon: <LocalOfferOutlined />,
    },
    {
      name: "Nhân viên",
      url: "nhan-vien",
      icon: <PeopleOutline />,
    },
  ];
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Fragment>
      <div className="h-screen">
        <div className="flex h-full shadow-xl rounded-md">
          {/* LEFT MENU */}
          <div
            className={`${isOpen ? "w-[15%]" : "w-[5%] items-center"
              } shadow-2xl transition-all duration-500 flex flex-col bg-gradient-to-tr from-indigo-600 to-indigo-200 px-2 py-1`}
          >
            <div
              className={`${isOpen ? "" : "hidden"
                } h-10 flex justify-center items-center border-b `} //chỉnh màu ở đây 
            >
              <img
                className="object-cover py-2 px-1"
                src="https://theme.hstatic.net/200000690725/1001078549/14/logo.png?v=418"
                alt="Logo"
              ></img>
            </div>
            <div
              className={`${isOpen ? "hidden" : ""
                } h-20 flex justify-center items-center`}
            >
              <img
                className="object-cover aspect-square w-20"
                src="https://lzd-img-global.slatic.net/g/p/d5034dd3d9cd35bab1db1a93e1605b8f.jpg_720x720q80.jpg"
                alt="Logo"
              ></img>
            </div>
            {
              links.map((item, index) => (
                <Link
                  key={index}
                  to={item.url}
                  className={`${location.pathname.endsWith(item.url) ? "bg-gray-100 opacity-70 rounded-s-md" : ""} my-2 py-1 px-1  border-b-gray-200 text-sm text-gray-900`}
                >
                  <div className="gap-2 flex">
                    <span>{item.icon}</span>
                    <span className={`${isOpen ? "text-left" : "hidden"} text-[12px] transition-all ease-in-out`}>
                      {item.name}
                    </span>
                  </div>
                </Link>
              ))

            }

          </div>
          {/* RIGHT MENU */}
          <div
            className={`${isOpen ? "w-[85%]" : "w-[95%]"
              } transition-all duration-500 shadow-2xl rounded-md relative px-3`}
          >
            <div className="h-full flex flex-col">
              <div className="bg-white flex items-center">
                <div className="flex items-center gap-10 h-10 justify-between w-full">
                  <div className="flex gap-4">
                    <div>
                      <button onClick={() => setIsOpen(!isOpen)}>
                        <MenuOutlined />
                      </button>
                    </div>
                    <div>
                      <p className="text-[20px] font-semibold">Dashboard</p>
                    </div>
                    <div>
                    </div>
                  </div>
                  <div>
                    <button className="text-black">
                      <NotificationsOutlined className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-gray-200 rounded-md h-full overflow-y-auto">
                  <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const Dropdown = ({
  links,
  label,
  icon,
  className,
}: {
  links: LinkEntity[];
  label: string;
  icon: React.ReactNode;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <div className={`text-left ${className}`}>
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full justify-between flex hover:bg-gray-200 p-2 rounded-md"
          >
            <span className="flex gap-2">
              {icon}
              {label}
            </span>
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
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
export default BaseAdminComponent;
