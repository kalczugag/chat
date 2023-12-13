import { MdOpenInNew } from "react-icons/md";
import { isMobile } from "react-device-detect";
import ChatsList from "./ChatsList";

const Sidebar = () => {
    return (
        <div
            className={`flex flex-col p-4 ${
                isMobile ? "w-screen" : "w-auto md:w-sidebar-width"
            }`}
        >
            <div className="flex flex-row justify-between items-center text-white pb-8">
                <h2 className="text-2xl font-bold">Chats</h2>
                <button className="text-xl">
                    <MdOpenInNew />
                </button>
            </div>
            <ChatsList />
        </div>
    );
};

export default Sidebar;
