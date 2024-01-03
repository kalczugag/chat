import { useEffect, useState } from "react";
import { fetchMessages, IChatState, IMsgData, IUsers } from "../store";
import { useThunk } from "../hooks/use-thunk";
import MessageBox from "./MessageBox";
import ScrollBar from "./ScrollBar";

type Props = {
    chatData: IChatState;
    userToSend?: IUsers;
    messagesData: IMsgData[];
};

const MessagesList = ({ userToSend, chatData, messagesData }: Props) => {
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
            setPage((prevPage) => {
                const updatedFetchSettings = {
                    chatId: chatData?._id,
                    page: 1,
                    pageSize: 10,
                };

                doFetchMessages(updatedFetchSettings);
                return 1;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatData?._id, page]);

    const handleLoadMoreMessages = () => {
        const updatedPage = page + 1;

        const updatedFetchSettings = {
            ...PAGINATION_FETCH_SETTINGS,
            page: updatedPage,
        };

        setPage(updatedPage);
        doFetchMessages(updatedFetchSettings);
    };

    const renderedMessageBoxes = messagesData.map((msg, index) => {
        return <MessageBox key={index} data={msg} userToSend={userToSend} />;
    });

    return (
        <ScrollBar className="mb-5 space-y-1">
            <div className="flex justify-center">
                {messagesData.length >= PAGINATION_FETCH_SETTINGS.pageSize ? (
                    <button
                        className="font-semibold border rounded-xl px-2 mb-6 bg-blue hover:bg-login-bg"
                        onClick={handleLoadMoreMessages}
                    >
                        Load more
                    </button>
                ) : null}
            </div>
            {renderedMessageBoxes}
        </ScrollBar>
    );
};

export default MessagesList;
