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
import { Layout } from "../../components/layout";

type LinkEntity = {
  name: string;
  url: string;
  icon: React.ReactNode;
};

const BaseAdminComponentV2 = () => {
  return (
    <Fragment>
      <Layout>
        <Outlet />
      </Layout>
    </Fragment>
  );
};


export default BaseAdminComponentV2;
