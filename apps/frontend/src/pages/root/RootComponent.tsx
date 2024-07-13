import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Fragment } from "react/jsx-runtime";
import 'react-toastify/dist/ReactToastify.css';
const RootComponent = () => {
    return (
        <Fragment>
            <Outlet></Outlet>
            <ToastContainer />
        </Fragment>
    );
}

export default RootComponent;