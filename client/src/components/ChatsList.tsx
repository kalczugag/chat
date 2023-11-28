import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { fetchChats, RootState } from "../store";
import { ChatState } from "../store/slices/chatSlice";
import { MdOpenInNew } from "react-icons/md";
import ChatsListItem from "./ChatsListItem";

const ChatsList = () => {
    const [doFetchChats, fetchingChats] = useThunk(fetchChats);
    const { data, isLoading }: ChatState = useSelector(
        (state: RootState) => state.chat
    );

    useEffect(() => {
        if (!data && !fetchingChats) {
            doFetchChats();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, doFetchChats]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const renderedChats = data?.map((chat) => {
        return <ChatsListItem key={chat._id} data={chat} />;
    });

    return (
        <div className="flex flex-col p-4">
            <div className="flex flex-row justify-between items-center text-white pb-8">
                <h2 className="text-2xl font-bold">Chats</h2>
                <button className="text-xl">
                    <MdOpenInNew />
                </button>
            </div>
            <div className="flex flex-col space-y-2">{renderedChats}</div>
        </div>
    );
};

export default ChatsList;
