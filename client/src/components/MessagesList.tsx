import { useSelector } from "react-redux";
import { RootState } from "../store";
import MessageBox from "./MessageBox";

const MessagesList = () => {
    const { data } = useSelector((state: RootState) => state.messages);

    const renderedMessageBoxes = data.map((msg, index) => {
        return <MessageBox key={index} data={msg} />;
    });

    return <>{renderedMessageBoxes}</>;
};

export default MessagesList;
