import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootComponent from "./components/RootComponent.tsx";
import BaseAdminComponent from "./views/admin/BaseAdminComponent.tsx";
import ManageProductComponent from "./views/admin/ManageProductComponent.tsx";
import ManageComponentDemo from "./views/admin/ManageCommentDemo.tsx";
import ReportComponent from "./views/admin/ReportComponent.tsx";
import SellInShopComponent from "./views/admin/SellInShopComponent.tsx";
import ManageBillComponent from "./views/admin/ManageBillComponent.tsx";
import ManageProductDetailComponent from "./views/admin/ManageProductDetailComponent.tsx";
import ManageStaffComponent from "./views/admin/ManageStaffComponent.tsx";
import { ThemeProvider } from "@material-tailwind/react";
import ListVoucher from "./views/admin/discount/ListVoucher.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import ManageVoucherComponent from "./views/admin/discount/ManageVoucherComponent.tsx";
// import ManageCustomer from "./views/admin/customer/ManageCustomer.tsx";
// import AddKhachHang from "./views/admin/customer/AddKhachHang.tsx";
// import ManageCustomer from "./views/admin/customer/ManageCustomer.tsx";
import ManageCustomerComponent from "./views/admin/customer/ManageCustomerComponent.tsx";
import FormAddKH from "./views/admin/customer/FormAddKH.tsx";
import UpdateKH from "./views/admin/customer/UpdateKH.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<RootComponent />}>
      <Route path="manage" element={<BaseAdminComponent />}>
        <Route path="" element={<ReportComponent />}></Route>
        <Route path="ban-hang" element={<SellInShopComponent />}></Route>
        <Route path="thong-ke" element={<ReportComponent />}></Route>

        <Route path="san-pham" element={<ManageProductComponent />}></Route>

        <Route
          path="san-pham-chi-tiet"
          element={<ManageProductDetailComponent />}
        ></Route>
        <Route path="khuyen-mai" element={<ManageVoucherComponent />}></Route>
        <Route path="hoa-don" element={<ManageBillComponent />}></Route>
        {/* <Route path="khach-hang" element={<ManageCustomer />}></Route> */}
        <Route path="khach-hang" element={<ManageCustomerComponent />}></Route>
        <Route path="add-customer" element={<FormAddKH />} />
        <Route path="update/:id" element={<UpdateKH />} />
        {/* <Route path="manage" element={<ManageCustomer />} /> */}
        <Route>
          <Route path="khuyen-mai" element={<ManageVoucherComponent />} />
          <Route path="khuyen-mai/list" element={<ListVoucher />} />
        </Route>
        <Route path="nhan-vien" element={<ManageStaffComponent />}></Route>
        <Route path="demo" element={<ManageComponentDemo />}></Route>
      </Route>
      <Route path="nhan-vien" element={<ManageStaffComponent />}></Route>
      <Route path="demo" element={<ManageComponentDemo />}></Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
