import { useSelector } from "react-redux";
import { RootState, fetchMessages } from "../store";
import MessageBox from "./MessageBox";

const MessagesList = () => {
    const { data } = useSelector((state: RootState) => state.messages);

    console.log(data);

    const renderedMessageBoxes = data.map((msg, index) => {
        return <MessageBox key={index} data={msg} />;
    });

    return <>{renderedMessageBoxes}</>;
};

export default MessagesList;
