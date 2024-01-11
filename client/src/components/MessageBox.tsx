import { useUser } from "../hooks/use-user";
import { IMsgData, IUsers } from "../store";
import { splitAndExtractInitials } from "../utils/functions/getInitials";
import Avatar, { Size } from "./Avatar";

type Props = {
    data: IMsgData;
    userToSend?: IUsers;
};

const MessageBox = ({ data, userToSend }: Props) => {
    const { user } = useUser();

    const imSender = (
        <div className="flex flex-col items-end">
            <div className="flex-wrap max-w-xs break-words bg-blue-main rounded-2xl p-2 md:max-w-md xl:max-w-xl">
                {data.content}
            </div>
        </div>
    );

    return (
        <>
            {user?._id !== data.sender ? (
                <div className="flex flex-row items-center py-3 space-x-2">
                    <Avatar size={Size.Large}>
                        {splitAndExtractInitials(userToSend?.username || "")}
                    </Avatar>
                    <div className="relative flex flex-col">
                        <p className="absolute -top-4 text-xs text-gray-400 font-semibold pl-2">
                            {userToSend?.username}
                        </p>
                        <div className="bg-login-input break-words rounded-2xl p-2">
                            {data.content}
                        </div>
                    </div>
                </div>
            ) : (
                imSender
            )}
        </>
    );
};

export default MessageBox;
