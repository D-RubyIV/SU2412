import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootComponent from './components/RootComponent.tsx'
import BaseAdminComponent from './views/admin/BaseAdminComponent.tsx'
import ManageProductComponent from './views/admin/ManageProductComponent.tsx'
import ManageVoucherComponent from './views/admin/ManageVoucherComponent.tsx'
import ManageComponentDemo from './views/admin/ManageCommentDemo.tsx'
import ReportComponent from './views/admin/ReportComponent.tsx'


const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='' element={<RootComponent />}>
        <Route path='manage' element={<BaseAdminComponent/>}>
          <Route  path='' element={<ReportComponent/>}></Route>
          <Route  path='san-pham' element={<ManageProductComponent/>}></Route>
          <Route  path='khuyen-mai' element={<ManageVoucherComponent/>}></Route>
          <Route  path='demo' element={<ManageComponentDemo/>}></Route>
        </Route>
      </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)