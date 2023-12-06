import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import { useSocket } from "../hooks/use-socket";
import ChatHeader from "./ChatHeader";
import MessageBox from "./MessageBox";

const ChatWindow = () => {
    const { chatId } = useParams();
    const socket = useSocket();
    const { isOpen } = useSelector((state: RootState) => state.chat);

    const sendMessage = (message: string) => {
        if ("emit" in socket) {
            // 'socket' is a Socket instance
            socket.emit("chat message", message);
        } else {
            // 'socket' is not a Socket instance
            console.error("Invalid socket:", socket);
        }
    };

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
                <button
                    onClick={() => sendMessage("xd")}
                    className="bg-gray-200 text-black font-bold"
                >
                    send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
