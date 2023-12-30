import { useEffect, useState } from "react";
import { fetchMessages, IChatState, IMsgData, IUsers } from "../store";
import { useThunk } from "../hooks/use-thunk";
import MessageBox from "./MessageBox";
import ScrollBar from "./ScrollBar";

type TMessagesListProps = {
    chatData: IChatState;
    userToSend?: IUsers;
    messagesData: IMsgData[];
};

const MessagesList = ({
    userToSend,
    chatData,
    messagesData,
}: TMessagesListProps) => {
    const [page, setPage] = useState<number>(1);
    const [doFetchMessages, isLoading] = useThunk(fetchMessages);

    const PAGINATION_FETCH_SETTINGS = {
        chatId: chatData?._id,
        page,
        pageSize: 10,
    };

    useEffect(() => {
        if (
            chatData?._id &&
            (!messagesData || messagesData.length === 0) &&
            !isLoading
        ) {
            doFetchMessages(PAGINATION_FETCH_SETTINGS);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatData?._id, page]);

    // useEffect(() => {
    //     console.log(chatData?.users.length);
    // }, [chatData]);

    const handleLoadMoreMessages = () => {
        setPage(page + 1);
        doFetchMessages(PAGINATION_FETCH_SETTINGS);
    };

    const renderedMessageBoxes = messagesData.map((msg, index) => {
        return <MessageBox key={index} data={msg} userToSend={userToSend} />;
    });

    return (
        <ScrollBar className="mb-5 space-y-5">
            <div className="flex justify-center">
                <button
                    className="font-semibold border rounded-xl px-2 bg-blue hover:bg-login-bg"
                    onClick={handleLoadMoreMessages}
                >
                    Load more
                </button>
            </div>
            {renderedMessageBoxes}
        </ScrollBar>
    );
};

export default MessagesList;
