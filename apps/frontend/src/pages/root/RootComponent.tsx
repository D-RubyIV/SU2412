import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { Layout } from "../../components/layout";

const RootComponent = () => {
    return (
        <Fragment>
                <Outlet></Outlet>
         
        </Fragment>
    );
}

export default RootComponent;