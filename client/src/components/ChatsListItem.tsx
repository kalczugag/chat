import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IChatState, setChatWindow } from "../store";

type ChatsListItemProps = {
    data: IChatState;
};

const ChatsListItem = ({ data }: ChatsListItemProps) => {
    const dispatch = useDispatch();
    const { _id, chatName, users, latestMessage } = data;
    const location = useLocation();

    const isActive = location.pathname === `/chats/${_id}`;
    const activeClass = isActive ? "bg-blue-main" : "";

    const handleOpenChat = () => {
        dispatch(setChatWindow(false));
    };

    return (
        <Link
            className={`flex flex-row items-center space-x-6 ${activeClass} rounded-md p-4`}
            to={`/chats/${_id}`}
            onClick={handleOpenChat}
        >
            <div className="relative">
                <img
                    className="w-10 h-10 rounded-full border"
                    src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
                    alt="avatar"
                />
                <img
                    className="absolute w-9 h-9 -bottom-4 -right-4 rounded-full border"
                    src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
                    alt="avatar"
                />
            </div>
            <div className="hidden flex-col font-semibold md:flex">
                <h3 className="text-white">{chatName}</h3>
                <p className="text-start text-sm text-gray-400">
                    {latestMessage || "Say hello"}
                </p>
            </div>
        </Link>
    );
};

export default ChatsListItem;
