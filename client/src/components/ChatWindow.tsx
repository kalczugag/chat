import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store";

const ChatWindow = () => {
    const { chatId } = useParams();
    const { isOpen } = useSelector((state: RootState) => state.chat);

    return (
        <div
            className={`bg-login-input p-4 rounded-md w-full ${
                isOpen && "hidden"
            }`}
        >
            {chatId}
        </div>
    );
};

export default ChatWindow;
