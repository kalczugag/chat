import { useSelector, useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";
import { Socket } from "socket.io-client";
import { IUsers, addMessageToDB, addMessage, RootState } from "../store";
import { useUser } from "../hooks/use-user";
import { useThunk } from "../hooks/use-thunk";
import { IoMdArrowDropup } from "react-icons/io";
import { IMsgData } from "../store/slices/messagesSlice";
import { findChatById } from "../utils/functions/findChatById";

type TMsgInput = {
    socket: Socket;
    userToSend?: IUsers;
    chatId?: string;
};

type TFormValues = {
    content: string;
};

const MsgContentInput = ({ socket, userToSend, chatId }: TMsgInput) => {
    const { user } = useUser();
    const dispatch = useDispatch();
    const [doAddMsg, isAddingMsg] = useThunk(addMessageToDB);
    const chatData = useSelector((state: RootState) => {
        if (chatId) return findChatById(state, chatId);
    });

    const handleAddMsg = (msg: IMsgData) => {
        dispatch(addMessage(msg));
        doAddMsg(msg);
    };

    const handleSendMessage = (value: TFormValues) => {
        const messageObj: IMsgData = {
            sender: user?._id,
            content: value.content,
            chatId,
        };

        if (messageObj.content) {
            if ("emit" in socket) {
                if (chatData?.isGroupChat) {
                    socket.emit(
                        "send_msg",
                        messageObj,
                        `group/${chatData?._id}`
                    );
                    handleAddMsg(messageObj);
                } else if (userToSend) {
                    socket.emit(
                        "send_msg",
                        messageObj,
                        `priv/${userToSend._id}`
                    );
                    handleAddMsg(messageObj);
                } else {
                    console.error("User to send private message not found");
                }
            }
        } else {
            console.error("Value can't be empty");
        }
    };

    const required = (value: TFormValues) => (value ? undefined : "Required");

    return (
        <Form
            onSubmit={handleSendMessage}
            render={({ handleSubmit, form }) => (
                <form
                    onSubmit={(event) => {
                        handleSubmit(event);
                        form.reset();
                    }}
                    className="flex flex-row justify-between space-x-2"
                >
                    <Field
                        name="content"
                        component="input"
                        validate={required}
                        className="w-full p-2 border border-gray-500 shadow-md rounded-md outline-none bg-transparent focus:border-blue-main focus:shadow-xl"
                    />

                    <button
                        disabled={isAddingMsg}
                        className="flex items-center justify-center bg-blue-main rounded-md w-12 h-12 p-3 text-xl"
                    >
                        {isAddingMsg ? "..." : <IoMdArrowDropup />}
                    </button>
                </form>
            )}
        />
    );
};

export default MsgContentInput;
