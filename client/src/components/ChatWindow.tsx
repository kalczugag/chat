import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import { useSocket } from "../hooks/use-socket";
import { useUser } from "../hooks/use-user";
import { findChatById } from "../utils/functions/findChatById";
import { IMsgData, addMessage } from "../store/slices/messagesSlice";
import ChatHeader from "./ChatHeader";
import MsgContentInput from "./MsgContentInput";
import MessagesList from "./MessagesList";

const ChatWindow = () => {
    const dispatch = useDispatch();
    const socket = useSocket();
    const { chatId } = useParams();
    const { user } = useUser();

    const { isOpen } = useSelector((state: RootState) => state.chat);
    const chatData = useSelector((state: RootState) => {
        if (chatId) return findChatById(state, chatId);
    });

    useEffect(() => {
        if (chatData?.isGroupChat && socket && "emit" in socket) {
            socket.emit("join_group", chatId);
        }
    });

    useEffect(() => {
        if (socket && "on" in socket)
            socket.on("receive_msg", (msg: IMsgData) => {
                handleAddMsgToState(msg);
            });
    }, [socket]);

    const handleAddMsgToState = (msg: IMsgData) => {
        dispatch(addMessage(msg));
    };

    return (
        <div className="flex flex-col w-full">
            <ChatHeader data="x" />
            <div
                className={`flex flex-col justify-end space-y-5 overflow-y-auto bg-gradient-to-b from-transparent to-login-input text-white p-6 h-full rounded-md ${
                    isOpen && "hidden"
                }`}
            >
                <MessagesList />
                <MsgContentInput
                    chatId={chatId}
                    socket={socket}
                    addMsgFn={handleAddMsgToState}
                />
            </div>
        </div>
    );
};

export default ChatWindow;
