import { IChatState } from "../store";

type ChatHeaderTypes = {
    data: string;
};

const ChatHeader = ({ data }: ChatHeaderTypes) => {
    return (
        <div className="flex flex-row justify-between p-2 pb-6 shadow-md">
            <div className="flex flex-row space-x-6 items-center">
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
                <div className="flex flex-col font-semibold">
                    <h3 className="text-white">adam & cameron</h3>
                    <p className="text-start text-sm text-gray-400">offline</p>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default ChatHeader;
