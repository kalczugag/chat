import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { fetchChats, RootState } from "../store";
import { TChatState } from "../store/slices/chatSlice";
import ChatsListItem from "./ChatsListItem";

const ChatsList = () => {
    const [doFetchChats, fetchingChats] = useThunk(fetchChats);
    const { data }: TChatState = useSelector((state: RootState) => state.chat);

    useEffect(() => {
        if (!data && !fetchingChats) {
            doFetchChats();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, doFetchChats]);

    if (!data || fetchingChats) {
        return null;
    }

    const renderedChats = data?.map((chat) => {
        return <ChatsListItem key={chat._id} data={chat} />;
    });

    return <div className="flex flex-col space-y-2">{renderedChats}</div>;
};

export default ChatsList;
