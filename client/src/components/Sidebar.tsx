import { MdOpenInNew } from "react-icons/md";
import ChatsList from "./ChatsList";

const Sidebar = () => {
    return (
        <div className="flex flex-col w-screen p-4 md:w-1/3">
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
