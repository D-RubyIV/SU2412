import React from "react";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import {
  IconDate,
  IconDocument,
  IconFolder,
  IconProduct,
  IconUser,
} from "../../icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ROLE } from "../../../constants/define";

type TMenu = {
  path: string;
  title: string;
  icon?: React.ReactNode;
};

const menuExamination: TMenu[] = [
  {
    path: "/reception",
    title: "Tiếp đón",
    icon: <IconDate />,
  },
  {
    path: "/examination",
    title: "Phiếu khám",
    icon: <IconDocument />,
  },
  {
    path: "/designation/list",
    title: "Dịch vụ chỉ định",
    icon: <IconDocument />,
  },
];
const menuSell: TMenu[] = [
  { path: "/order", title: "Bán hàng", icon: <IconDocument /> },
];
const menuPartner: TMenu[] = [
  {
    path: "/manage/khach-hang",
    title: "Khách hàng",
    icon: <IconUser />,
  },
];

const menuBill: TMenu[] = [
  {
    path: "/manage/hoa-don",
    title: "Hóa đơn",
    icon: <IconProduct />,
  }
];
const menuProduct: TMenu[] = [
  {
    path: "/manage/san-pham",
    title: "Sản phẩm",
    icon: <IconProduct />,
  },
  {
    path: "/manage/list",
    title: "Danh mục",
    icon: <IconFolder />,
  },
];

const menuConfiguration: TMenu[] = [
  {
    path: "/manage/nhan-vien",
    title: "Nhân viên",
    icon: <IconProduct />,
  },
  {
    path: "/manage/khuyen-mai",
    title: "Khuyến mãi",
    icon: <IconProduct />,
  },
  {
    path: "/manage/title",
    title: "Chức danh",
    icon: <IconFolder />,
  },
  {
    path: "/manage/clinic",
    title: "Phòng khám",
    icon: <IconFolder />,
  },
  {
    path: "/manage/list",
    title: "Dịch vụ",
    icon: <IconFolder />,
  },
];
const menuStatistical: TMenu[] = [
  {
    path: "/dashboard",
    title: "Thống kê",
    icon: <IconProduct />,
  },
];

const Sidebar = () => {
  const auth: any = useSelector((state: RootState) => state.auth.auth?.user);
  const NavLinkClass =
    "block font-medium py-3 pl-10  border-l-[5px] text-sm link-menu ";
  return (
    <React.Fragment>
      <div className="fixed bottom-0 left-0  w-[250px] z-10 shadowSidebar top-16 bg-white sidebar">
        <PerfectScrollbar>
          {auth?.role?.roleNumber === ROLE.ADMIN ||
            auth?.role?.roleNumber === ROLE.DOCTOR ||
            auth?.role?.roleNumber === ROLE.STAFFRECEPTION ? (
            <div>
              <h4 className="heading-menu px-5 py-3 text-xs font-medium">
                KHÁM BỆNH
              </h4>
              <div className="flex flex-col ">
                {menuExamination?.map((item) => (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? ` text-primary bg-primary50 ${NavLinkClass} border-l-primary`
                        : `hover:text-primary ${NavLinkClass}`
                    }
                  >
                    <div className="flex items-center gap-x-3">
                      <span>{item.icon}</span>
                      <span className="menu-title">{item.title}</span>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          ) : null}
          <div>
            <h4 className="heading-menu px-5 py-3 text-xs font-medium">
              BÁN HÀNG
            </h4>
            <div className="flex flex-col ">
              {menuSell?.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? ` text-primary bg-primary50 ${NavLinkClass}border-l-primary`
                      : `hover:text-primary ${NavLinkClass}`
                  }
                >
                  <div className="flex items-center gap-x-3">
                    <span>{item.icon}</span>
                    <span className="menu-title">{item.title}</span>
                  </div>
                </NavLink>
              ))}
              <NavLink
                to={"https://medipro-pos.vercel.app"}
                target="_blank"
                className={({ isActive }) =>
                  isActive
                    ? ` text-primary bg-primary50 ${NavLinkClass}border-l-primary`
                    : `hover:text-primary ${NavLinkClass}`
                }
              >
                <div className="flex items-center gap-x-3">
                  <span>
                    <IconDocument />
                  </span>
                  <span className="menu-title">Bán hàng</span>
                </div>
              </NavLink>
            </div>
          </div>

          <div>
            <h4 className="heading-menu px-5 py-3 text-xs font-medium">
              ĐỐI TÁC
            </h4>
            <div className="flex flex-col ">
              {menuPartner?.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? ` text-primary bg-primary50 ${NavLinkClass}border-l-primary`
                      : `hover:text-primary ${NavLinkClass}`
                  }
                >
                  <div className="flex items-center gap-x-3">
                    <span>{item.icon}</span>
                    <span className="menu-title">{item.title}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h4 className="heading-menu px-5 py-3 text-xs font-medium">
              SẢN PHẨM
            </h4>
            <div className="flex flex-col ">
              {menuProduct?.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? ` text-primary bg-primary50 ${NavLinkClass}border-l-primary`
                      : `hover:text-primary ${NavLinkClass}`
                  }
                >
                  <div className="flex items-center gap-x-3">
                    <span>{item.icon}</span>
                    <span className="menu-title">{item.title}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h4 className="heading-menu px-5 py-3 text-xs font-medium">
              HÓA ĐƠN
            </h4>
            <div className="flex flex-col ">
              {menuBill?.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? ` text-primary bg-primary50 ${NavLinkClass}border-l-primary`
                      : `hover:text-primary ${NavLinkClass}`
                  }
                >
                  <div className="flex items-center gap-x-3">
                    <span>{item.icon}</span>
                    <span className="menu-title">{item.title}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h4 className="heading-menu px-5 py-3 text-xs font-medium">
              CẤU HÌNH
            </h4>
            <div className="flex flex-col ">
              {menuConfiguration?.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? ` text-primary bg-primary50 ${NavLinkClass}border-l-primary`
                      : `hover:text-primary ${NavLinkClass}`
                  }
                >
                  <div className="flex items-center gap-x-3">
                    <span>{item.icon}</span>
                    <span className="menu-title">{item.title}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>


          <div>
            <h4 className="heading-menu px-5 py-3 text-xs font-medium">
              THỐNG KÊ
            </h4>
            <div className="flex flex-col ">
              {menuStatistical?.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? ` text-primary bg-primary50 ${NavLinkClass}border-l-primary`
                      : `hover:text-primary ${NavLinkClass}`
                  }
                >
                  <div className="flex items-center gap-x-3">
                    <span>{item.icon}</span>
                    <span className="menu-title">{item.title}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>


        </PerfectScrollbar>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
