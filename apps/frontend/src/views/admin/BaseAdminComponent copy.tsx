import { Outlet} from "react-router-dom";
import { Fragment} from "react";
import { Layout } from "../../components/layout";

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
