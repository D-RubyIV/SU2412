import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const RootComponent = () => {
    return ( 
        <Fragment>
            <div className="relative">
                <Outlet></Outlet>
            </div>
        </Fragment>
     );
}
 
export default RootComponent;