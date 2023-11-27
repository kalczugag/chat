import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { fetchChats } from "../store";
import { ChatState } from "../store/slices/chatSlice";
import ChatsListItem from "./ChatsListItem";

const ChatsList = () => {
    const [doFetchChats, fetchingChats] = useThunk(fetchChats);

    const chats: ChatState = useSelector((state: any) => state.chats);

    useEffect(() => {
        if (!chats && !fetchingChats) {
            doFetchChats();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chats, doFetchChats]);

    return (
        <div>
            <ChatsListItem data={chats.data} />
        </div>
    );
};

export default ChatsList;
