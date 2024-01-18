import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { RootState, setChatWindow } from "../store";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state: RootState) => state.chat);

    useEffect(() => {
        const handlePopstate = () => {
            navigate("/");
        };

        window.addEventListener("popstate", handlePopstate);

        return () => {
            window.removeEventListener("popstate", handlePopstate);
        };
    }, [navigate]);

    useEffect(() => {
        if (location.pathname === "/") {
            dispatch(setChatWindow(true));
        } else {
            dispatch(setChatWindow(false));
        }
    }, [location.pathname, dispatch]);

    return (
        <div className="flex px-4 pt-4 h-full md:px-12 md:flex-row">
            {isMobile && !isOpen ? "" : <Sidebar />}
            {!isOpen && (
                <div className="flex flex-col items-center">
                    <h1 className="text-white mx-auto mt-40 font-bold text-4xl">
                        Dashboard
                    </h1>
                    <img
                        src="/assets/images/wavingHand.png"
                        alt="waving hand"
                        className="w-1/2 h-1/2 object-contain"
                    />
                </div>
            )}
            <Outlet />
        </div>
    );
};

export default DashboardPage;
