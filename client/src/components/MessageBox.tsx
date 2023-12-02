import { useUser } from "../hooks/use-user";

type UserType = {
    pic: string;
    username: string;
};

type TData = {
    sender: string;
    content: { text?: string; img?: string; file?: any };
    chatId: string;
    readBy?: UserType[];
};

type TMessageBox = {
    // data: DataTypes;
    sender: number;
};

//demo for tests
//without dynamic props
const MessageBox = ({ sender }: TMessageBox) => {
    const { user } = useUser();

    const imSender = (
        <div className="flex flex-col items-end">
            <div className="bg-blue-main rounded-2xl p-2">Hey Dudes</div>
            <img
                className="w-3 h-3 rounded-full border"
                src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
                alt="user"
            />
        </div>
    );

    return (
        <>
            {/* user?._id === data.sender */}
            {sender === 1 ? (
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
                            Hey Dudes
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
