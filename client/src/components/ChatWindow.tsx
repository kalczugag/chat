import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, addMessageToDB, addMessage, IMsgData } from "../store";
import { useSocket } from "../hooks/use-socket";
import { useUser } from "../hooks/use-user";
import { useThunk } from "../hooks/use-thunk";
import { findChatById } from "../utils/functions/findChatById";
import ChatHeader from "./ChatHeader";
import MsgContentInput from "./MsgContentInput";
import MessagesList from "./MessagesList";

const ChatWindow = () => {
    const dispatch = useDispatch();
    const socket = useSocket();
    const { chatId } = useParams();
    const { user } = useUser();
    const [doAddMsg, isAddingMsg] = useThunk(addMessageToDB);
    const { isOpen } = useSelector((state: RootState) => state.chat);
    const chatData = useSelector((state: RootState) => {
        if (chatId) return findChatById(state, chatId);
    });
    const messagesData = useSelector((state: RootState) => {
        return state.messages.data.filter((msg) => {
            return msg.chatId === chatData?._id;
        });
    });

    useEffect(() => {
        if (chatData?.isGroupChat && socket && "emit" in socket) {
            socket.emit("join_group", chatId);
        }
    }, [chatData, chatId, socket]);

    useEffect(() => {
        if (socket && "on" in socket) {
            socket.on("receive_msg", (msg: IMsgData) => {
                handleAddMsgToState(msg);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    const handleAddMsgToState = (msg: IMsgData) => {
        dispatch(addMessage(msg));
        doAddMsg(msg);
    };

    if (!chatData || !user || !messagesData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full">
            <ChatHeader data="x" />
            <div
                className={`flex flex-col justify-end overflow-y-hidden bg-gradient-to-b from-transparent to-login-input text-white p-6 h-full rounded-md ${
                    isOpen && "hidden"
                }`}
            >
                <MessagesList
                    userId={user._id}
                    chatData={chatData}
                    messagesData={messagesData}
                />
                <MsgContentInput
                    chatId={chatId}
                    socket={socket}
                    isLoading={isAddingMsg}
                    addMsgFn={handleAddMsgToState}
                />
            </div>
        </div>
    );
};

export default ChatWindow;
