import { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { Socket } from "socket.io-client";
import { RootState } from "../store";
import { useUser } from "../hooks/use-user";
import { IoMdArrowDropup } from "react-icons/io";
import { IMsgData } from "../store/slices/messagesSlice";
import { findChatById } from "../utils/functions/findChatById";

type TMsgInput = {
    socket: Socket;
    chatId?: string;
    isLoading: boolean;
    addMsgFn: (msg: IMsgData) => void;
};

type TFormValues = {
    content: string;
};

const MsgContentInput = ({
    socket,
    chatId,
    isLoading,
    addMsgFn,
}: TMsgInput) => {
    const { user } = useUser();

    const chatData = useSelector((state: RootState) => {
        if (chatId) return findChatById(state, chatId);
    });

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
                } else {
                    socket.emit("send_msg", messageObj, `priv/${chatData}`);
                }

                addMsgFn(messageObj);
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
                        className="w-full p-2 border border-gray-500 shadow-md rounded-md outline-none bg-transparent focus:outline-blue-main focus:shadow-xl"
                    />

                    <button
                        disabled={isLoading}
                        className="bg-blue-main rounded-md h-12 w-12 p-3 text-xl"
                    >
                        {isLoading ? "..." : <IoMdArrowDropup />}
                    </button>
                </form>
            )}
        />
    );
};

export default MsgContentInput;
