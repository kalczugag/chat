import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IChatState, setChatWindow } from "../store";
import NameToPic, { Size } from "./NameToPic";

type Props = {
    data: IChatState;
};

const ChatsListItem = ({ data }: Props) => {
    const dispatch = useDispatch();
    const { _id, chatName, users, latestMessage } = data;
    const location = useLocation();

    const isActive = location.pathname === `/chats/${_id}`;
    const activeClass = isActive ? "bg-blue-main" : "";

    const user1 = data.users[0].username;
    const user2 = data.users[1].username;

    const handleOpenChat = () => {
        dispatch(setChatWindow(false));
    };

    const latestMessageShort =
        latestMessage?.split("").length || 0 > 6
            ? latestMessage
            : latestMessage?.slice(0, 6) + "...";

    return (
        <Link
            className={`flex flex-row items-center space-x-6 ${activeClass} rounded-md p-4`}
            to={`/chats/${_id}`}
            onClick={handleOpenChat}
        >
            <div className="relative">
                {/* to change ↓ */}
                <NameToPic
                    content={user1 || ""}
                    size={Size.Large}
                    className="border border-login-bg"
                />
                <NameToPic
                    content={user2 || ""}
                    size={Size.Medium}
                    className="absolute -bottom-4 -right-4 border border-login-bg"
                />
            </div>
            <div className="hidden flex-col font-semibold md:flex">
                <h3 className="text-white">{chatName}</h3>
                <p className="text-start text-sm text-gray-400">
                    {latestMessageShort}
                </p>
            </div>
        </Link>
    );
};

export default ChatsListItem;
