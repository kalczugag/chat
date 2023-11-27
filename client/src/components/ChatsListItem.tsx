import { ChatState } from "../store/slices/chatSlice";

const ChatsListItem = ({ data }: ChatState) => {
    return (
        <div className="flex flex-row bg-blue-main">
            {/* {users.length > 1 ? (
                <div>
                    <img
                        className="relative"
                        src={users[0]?.pic}
                        alt="avatar"
                    />
                    <img
                        className="relative"
                        src={users[1]?.pic}
                        alt="avatar"
                    />
                </div>
            ) : (
                <img src={users[0]?.pic} alt="avatar" />
            )}
            <div className="flex flex-col">
                <h1>{chatName}</h1>
                <p>{latestMessage}</p>
            </div> */}
        </div>
    );
};

export default ChatsListItem;
