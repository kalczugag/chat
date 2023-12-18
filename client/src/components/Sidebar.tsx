import { MdOpenInNew } from "react-icons/md";
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
                <h2 className="text-2xl font-bold">Chats</h2>
                <Link to="/new" className="text-xl hover:text-blue-main">
                    <MdOpenInNew />
                </Link>
            </div>
            <ChatsList />
        </div>
    );
};

export default Sidebar;
