import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
    return (
        <div className="flex flex-row p-2">
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default DashboardPage;
