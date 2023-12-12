import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, fetchMessages } from "../store";
import { useThunk } from "../hooks/use-thunk";
import MessageBox from "./MessageBox";
import ScrollBar from "./ScrollBar";

type TMessagesListProps = {
    chatId?: string;
};

const MessagesList = ({ chatId }: TMessagesListProps) => {
    const [page, setPage] = useState<number>(1);
    const [doFetchMessages] = useThunk(fetchMessages);
    const data = useSelector((state: RootState) => {
        return state.messages.data.filter((msg) => {
            return msg.chatId === chatId;
        });
    });

    useEffect(() => {
        if (data.length < 10 * page - 1) {
            doFetchMessages({ chatId, page, pageSize: 10 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId]);

    const renderedMessageBoxes = data.map((msg, index) => {
        return <MessageBox key={index} data={msg} />;
    });

    return (
        <ScrollBar className="mb-5 space-y-5">{renderedMessageBoxes}</ScrollBar>
    );
};

export default MessagesList;
