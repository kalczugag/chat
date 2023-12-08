import { useState } from "react";
import { Socket } from "socket.io-client";
import { useUser } from "../hooks/use-user";
import { IoMdArrowDropup } from "react-icons/io";
import { IMsgData } from "../store/slices/messagesSlice";

type TMsgInput = {
    socket: Socket;
    chatId?: string;
    addMsgFn: (msg: IMsgData) => void;
};

const defaultValues: IMsgData = {
    sender: "",
    content: { text: "" },
    chatId: "",
    readBy: "",
};

const MsgContentInput = ({ socket, chatId, addMsgFn }: TMsgInput) => {
    const { user } = useUser();
    const [inputValue, setInputValue] = useState<IMsgData>(defaultValues);

    const handleSendMessage = () => {
        if ("emit" in socket) {
            if (inputValue) {
                socket.emit("send_msg", inputValue);
                addMsgFn(inputValue);
                setInputValue(defaultValues);
            }
        } else {
            console.error("Invalid socket:", socket);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({
            sender: user?._id,
            content: { text: event.target.value },
            chatId,
            readBy: user?._id,
        });
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-row  justify-between space-x-2">
            <input
                className="w-full p-2 border border-gray-500 shadow-md rounded-md outline-none bg-transparent focus:outline-blue-main focus:shadow-xl"
                placeholder="Aa"
                type="text"
                value={inputValue?.content?.text}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
            <button
                className="bg-blue-main rounded-md p-3 text-xl"
                onClick={handleSendMessage}
            >
                <IoMdArrowDropup />
            </button>
        </div>
    );
};

export default MsgContentInput;
