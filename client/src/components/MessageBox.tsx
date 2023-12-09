import { useUser } from "../hooks/use-user";
import { IMsgData } from "../store";

type TMessageBox = {
    data: IMsgData;
};

const MessageBox = ({ data }: TMessageBox) => {
    const { user } = useUser();

    const imSender = (
        <div className="flex flex-col items-end">
            <div className="bg-blue-main rounded-2xl p-2">
                {data.content?.text}
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
                    <img
                        className="w-10 h-10 rounded-full border"
                        src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
                        alt="user"
                    />
                    <div className="flex flex-col">
                        <p className="text-xs text-gray-400 font-semibold pl-2">
                            adam
                        </p>
                        <div className="bg-login-input rounded-2xl p-2">
                            {data.content?.text}
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
