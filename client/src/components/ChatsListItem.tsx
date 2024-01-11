import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IChatState, setChatWindow } from "../store";
import { splitAndExtractInitials } from "../utils/functions/getInitials";
import Avatar, { Size } from "./Avatar";

type Props = {
    data: IChatState;
};

const ChatsListItem = ({ data }: Props) => {
    const dispatch = useDispatch();
    const { _id, chatName, isGroupChat, users, latestMessage } = data;
    const location = useLocation();

    const isActive = location.pathname === `/chats/${_id}`;
    const activeClass = isActive ? "bg-blue-main" : "";

    const user1 = data.users[0].username;
    const user2 = data.users[1].username;

    const handleOpenChat = () => {
        dispatch(setChatWindow(false));
    };

    const latestMessageShort =
        latestMessage?.split("").length! <= 10
            ? latestMessage
            : latestMessage?.slice(0, 10) + "...";

    return (
        <Link
            className={`flex flex-row items-center space-x-6 ${activeClass} rounded-md p-4`}
            to={`/chats/${_id}`}
            onClick={handleOpenChat}
        >
            <div className="relative">
                {/* to change ↓ */}
                <Avatar size={Size.Large} className="border border-login-bg">
                    {splitAndExtractInitials(user1 || "")}
                </Avatar>
                <Avatar
                    size={Size.Medium}
                    className="absolute -bottom-4 -right-4 border border-login-bg"
                >
                    {splitAndExtractInitials(user2 || "")}
                </Avatar>
            </div>
            <div className="hidden flex-col font-semibold md:flex">
                <h3 className="text-white">
                    {isGroupChat ? chatName : `${user1} & ${user2}`}
                </h3>
                <p className="text-start text-sm text-gray-400">
                    {latestMessageShort}
                </p>
            </div>
        </Link>
    );
};

export default ChatsListItem;
