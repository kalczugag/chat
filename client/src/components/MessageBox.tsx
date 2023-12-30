import { useUser } from "../hooks/use-user";
import { IMsgData, IUsers } from "../store";
import NameToPic from "./NameToPic";

type TMessageBox = {
    data: IMsgData;
    userToSend?: IUsers;
};

const MessageBox = ({ data, userToSend }: TMessageBox) => {
    const { user } = useUser();

    const isProfilePic = false ? (
        <img
            className="w-3 h-3 rounded-full border"
            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
            alt="user"
        />
    ) : (
        <NameToPic username={data.sender || ""} />
    );

    const imSender = (
        <div className="flex flex-col items-end">
            <div className="flex-wrap max-w-xs break-all bg-blue-main rounded-2xl p-2 md:max-w-md xl:max-w-xl">
                {data.content}
            </div>
            <img
                className="w-3 h-3 rounded-full border"
                src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
                alt="user"
            />
        </div>
    );

    return (
        <>
            {user?._id !== data.sender ? (
                <div className="flex flex-row items-center space-x-2">
                    {isProfilePic}
                    <div className="relative flex flex-col">
                        <p className="absolute -top-4 text-xs text-gray-400 font-semibold pl-2">
                            {data.sender}
                        </p>
                        <div className="bg-login-input rounded-2xl p-2">
                            {data.content}
                        </div>
                        <img
                            className="w-3 h-3 rounded-full border"
                            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
                            alt="user"
                        />
                    </div>
                </div>
            ) : (
                imSender
            )}
        </>
    );
};

export default MessageBox;
