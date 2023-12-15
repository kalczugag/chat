import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, fetchMessages, fetchSelectedUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import { getUniqueIds } from "../utils/functions/getUniqueUserIds";
import MessageBox from "./MessageBox";
import ScrollBar from "./ScrollBar";

type TMessagesListProps = {
    chatId?: string;
    userId?: string;
};

const MessagesList = ({ chatId, userId }: TMessagesListProps) => {
    const [page, setPage] = useState<number>(1);
    const [doFetchMessages, isLoading] = useThunk(fetchMessages);
    const [doFetchUserById] = useThunk(fetchSelectedUser);
    const data = useSelector((state: RootState) => {
        return state.messages.data.filter((msg) => {
            return msg.chatId === chatId;
        });
    });

    const usersIds = getUniqueIds(data, userId!);

    useEffect(() => {
        if (chatId && (!data || data.length === 0) && !isLoading) {
            doFetchMessages({ chatId, page, pageSize: 10 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId, page]);

    useEffect(() => {
        usersIds.map((id) => {
            return doFetchUserById(id);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doFetchUserById]);

    const renderedMessageBoxes = data.map((msg, index) => {
        return <MessageBox key={index} data={msg} />;
    });

    return (
        <ScrollBar className="mb-5 space-y-5">{renderedMessageBoxes}</ScrollBar>
    );
};

export default MessagesList;
