import { useUser } from "../hooks/use-user";
import { IMsgData, IUsers } from "../store";
import NameToPic, { Size } from "./NameToPic";

type TMessageBox = {
    data: IMsgData;
    userToSend?: IUsers;
};

const MessageBox = ({ data, userToSend }: TMessageBox) => {
    const { user } = useUser();

    const imSender = (
        <div className="flex flex-col items-end">
            <div className="flex-wrap max-w-xs break-all bg-blue-main rounded-2xl p-2 md:max-w-md xl:max-w-xl">
                {data.content}
            </div>
        </div>
    );

    return (
        <>
            {user?._id !== data.sender ? (
                <div className="flex flex-row items-center space-x-2">
                    <NameToPic
                        content={userToSend?.username || ""}
                        size={Size.Large}
                    />
                    <div className="relative flex flex-col">
                        <p className="absolute -top-4 text-xs text-gray-400 font-semibold pl-2">
                            {userToSend?.username}
                        </p>
                        <div className="bg-login-input rounded-2xl p-2">
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
