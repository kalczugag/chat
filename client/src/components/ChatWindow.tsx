import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import { useSocket } from "../hooks/use-socket";
import { IMsgData } from "../store/slices/messagesSlice";
import ChatHeader from "./ChatHeader";
import MessageBox from "./MessageBox";
import MsgContentInput from "./MsgContentInput";

const ChatWindow = () => {
    const dispatch = useDispatch();
    const { chatId } = useParams();
    const socket = useSocket();
    const { isOpen } = useSelector((state: RootState) => state.chat);

    useEffect(() => {
        if (socket && "on" in socket)
            socket.on("receive_msg", (msg: IMsgData) => {
                console.log(msg);
            });
    }, [socket]);

    return (
        <div className="flex flex-col w-full">
            <ChatHeader data="x" />
            <div
                className={`flex flex-col justify-end space-y-5 overflow-y-auto bg-gradient-to-b from-transparent to-login-input text-white p-6 h-full rounded-md ${
                    isOpen && "hidden"
                }`}
            >
                <MessageBox sender={1} />
                <MsgContentInput socket={socket} />
            </div>
        </div>
    );
};

export default ChatWindow;
