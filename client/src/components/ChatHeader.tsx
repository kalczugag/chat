import { IChatState } from "../store";
import NameToPic, { Size } from "./NameToPic";

type Props = {
    data: IChatState;
};

const ChatHeader = ({ data }: Props) => {
    const user1 = data.users[0].username;
    const user2 = data.users[1].username;

    return (
        <div className="flex flex-row justify-between p-2 pb-6 shadow-md">
            <div className="flex flex-row space-x-6 items-center">
                <div className="relative">
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
                <div className="flex flex-col font-semibold">
                    <h3 className="text-white">
                        {data.isGroupChat
                            ? data.chatName
                            : `${user1} & ${user2}`}
                    </h3>
                    <p className="text-start text-sm text-gray-400">offline</p>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default ChatHeader;
