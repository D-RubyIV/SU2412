import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const RootComponent = () => {
    return (
        <Fragment>
            <div className="justify-center flex">
                <div className="relative w-full max-w-[1500px] ">
                    <Outlet></Outlet>
                </div>
            </div>
        </Fragment>
    );
}

export default RootComponent;