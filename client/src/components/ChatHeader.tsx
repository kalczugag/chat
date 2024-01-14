import { IChatState, RootState, removeChat } from "../store";
import { FaRegTrashAlt } from "react-icons/fa";
import { splitAndExtractInitials } from "../utils/functions/getInitials";
import Avatar, { Size } from "./Avatar";
import ChatEditForm from "./ChatEditForm";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";

type Props = {
    data: IChatState;
};

const ChatHeader = ({ data }: Props) => {
    const [doRemoveChat, isRemovingChat] = useThunk(removeChat);
    const isOnline = useSelector((state: RootState) => state.chat.isOnline);

    console.log(isOnline);

    const user1 = data.users[0].username;
    const user2 = data.users[1].username;

    const handleRemoveChat = () => {
        doRemoveChat(data._id);
    };

    return (
        <div className="flex flex-row justify-between p-2 pb-6 shadow-md text-white">
            <div className="flex flex-row space-x-6 items-center">
                <div className="relative">
                    <Avatar
                        size={Size.Large}
                        className="border border-login-bg"
                    >
                        {splitAndExtractInitials(user1 || "")}
                    </Avatar>
                    <Avatar
                        size={Size.Medium}
                        className="absolute -bottom-4 -right-4 border border-login-bg"
                    >
                        {splitAndExtractInitials(user2 || "")}
                    </Avatar>
                </div>
                <div className="flex flex-col font-semibold">
                    <h3>
                        {data.isGroupChat
                            ? data.chatName
                            : `${user1} & ${user2}`}
                    </h3>
                    <p className="text-start text-sm text-gray-400">
                        {isOnline ? "online" : "offline"}
                    </p>
                </div>
            </div>
            <div className="flex space-x-4 items-center">
                <ChatEditForm />
                <button
                    onClick={handleRemoveChat}
                    disabled={isRemovingChat}
                    className="hover:opacity-90"
                >
                    <FaRegTrashAlt />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
