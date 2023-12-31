import { MdOpenInNew, MdLogout } from "react-icons/md";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import ChatsList from "./ChatsList";

const Sidebar = () => {
    return (
        <div
            className={`flex flex-col ${
                isMobile ? "w-screen" : "w-auto md:w-sidebar-width"
            } p-2 md:p-4`}
        >
            <div className="flex flex-row justify-between items-center text-white pb-8">
                <Link to="/" className="text-2xl font-bold hover:opacity-90">
                    Chats
                </Link>
                <Link to="/new" className="text-xl hover:text-blue-main">
                    <MdOpenInNew />
                </Link>
                {/* <a href="/api/auth/logout">
                    <MdLogout />
                </a> */}
            </div>
            <ChatsList />
        </div>
    );
};

export default Sidebar;
