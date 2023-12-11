import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MessageBox from "./MessageBox";
import ScrollBar from "./ScrollBar";

type TMessagesListProps = {
    chatId?: string;
};

const MessagesList = ({ chatId }: TMessagesListProps) => {
    const data = useSelector((state: RootState) => {
        return state.messages.data.filter((msg) => {
            return msg.chatId === chatId;
        });
    });

    const memoizedData = useMemo(() => data, [data]);

    const renderedMessageBoxes = memoizedData.map((msg, index) => {
        return <MessageBox key={index} data={msg} />;
    });

    return (
        <ScrollBar className="mb-5 space-y-5">{renderedMessageBoxes}</ScrollBar>
    );
};

export default MessagesList;
