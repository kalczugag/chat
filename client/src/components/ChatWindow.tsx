import { useParams } from "react-router-dom";

const ChatWindow = () => {
    const { chatId } = useParams();

    return <div className="bg-login-input w-full p-4 rounded-md">{chatId}</div>;
};

export default ChatWindow;
