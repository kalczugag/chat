import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import ChatHeader from "./ChatHeader";
import MessageBox from "./MessageBox";

const ChatWindow = () => {
    const { chatId } = useParams();
    const { isOpen } = useSelector((state: RootState) => state.chat);

    return (
        <div className="flex flex-col w-full">
            <ChatHeader data="x" />
            <div
                className={`flex flex-col space-y-4 overflow-y-auto bg-gradient-to-b from-transparent to-login-input text-white p-4 h-full rounded-md ${
                    isOpen && "hidden"
                }`}
            >
                {/* so many component due to tests */}
                <MessageBox sender={1} />
                <MessageBox sender={0} />
                <MessageBox sender={1} />
                <MessageBox sender={0} />
                <MessageBox sender={1} />
                <MessageBox sender={0} />
                <MessageBox sender={1} />
            </div>
        </div>
    );
};

export default ChatWindow;
