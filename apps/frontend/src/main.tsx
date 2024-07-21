
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootComponent from './pages/root/RootComponent.tsx'
import ManageProductComponent from './views/admin/ManageProductComponent.tsx'
import ManageComponentDemo from './views/admin/ManageCommentDemo.tsx'
import ReportComponent from './views/admin/ReportComponent.tsx'
import SellInShopComponent from './views/admin/SellInShopComponent.tsx'
import ManageProductDetailComponent from './views/admin/ManageProductDetailComponent.tsx'
import ManageCustomerComponent from './views/admin/ManageCustomerComponent.tsx'
import ManageStaffComponent from './views/admin/Staff/ManageStaffComponent.tsx'

import { ThemeProvider } from "@material-tailwind/react"
import ListVoucher from './views/admin/discount/ListVoucher.tsx'
import NotFound from './pages/NotFound/NotFound.tsx'
import ManageVoucherComponent from './views/admin/discount/ManageVoucherComponent.tsx'
import { store } from "./redux/store.tsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import BaseAdminComponentV2 from './views/admin/BaseAdminComponent copy.tsx'
import ManageBillComponent from './pages/bill/ManageBillComponent.tsx'
import ConfirmBillComponent from './pages/bill/ConfirmBillComponent.tsx'
import AddNhanVien from './views/admin/Staff/AddNhanVien.tsx'
import UpdateNhanVien from './views/admin/Staff/UpdateNhanVien.tsx'
// import QuetCCCD from './views/admin/Staff/QuetCCCD.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<RootComponent />}>
      <Route path='manage' element={<BaseAdminComponentV2 />}>
        <Route path='' element={<ReportComponent />}></Route>
        <Route path='ban-hang' element={<SellInShopComponent />}></Route>
        <Route path='thong-ke' element={<ReportComponent />}></Route>

        <Route path='san-pham' element={<ManageProductComponent />} />

        <Route path='san-pham-chi-tiet' element={<ManageProductDetailComponent />}></Route>
        <Route path='khuyen-mai' element={<ManageVoucherComponent />}></Route>
        <Route path='hoa-don'>
          <Route path='' element={<ManageBillComponent />} />
          <Route path=':id' element={<ConfirmBillComponent />} />
        </Route>
        <Route path='khach-hang' element={<ManageCustomerComponent />}></Route>
        <Route>
          <Route path="khuyen-mai" element={<ManageVoucherComponent />} />
          <Route path="khuyen-mai/list" element={<ListVoucher />} />
        </Route>
        <Route path='nhan-vien' element={<ManageStaffComponent />}></Route>
        <Route path='add-nhan-vien' element={<AddNhanVien />}></Route>
        <Route path="update-nhan-vien/:id" element={<UpdateNhanVien />}></Route>
        {/* <Route path="quetCCCD" element={<QuetCCCD />}></Route> */}

        <Route path='demo' element={<ManageComponentDemo />}></Route>
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
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="colored"
        />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
