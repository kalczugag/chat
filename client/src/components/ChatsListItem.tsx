import { useLocation } from "react-router-dom";
import { IChatState } from "../store/slices/chatSlice";

type ChatsListItemProps = {
    data: IChatState;
};

const ChatsListItem = ({ data }: ChatsListItemProps) => {
    const { chatName, users, latestMessage } = data;
    const location = useLocation();

    const isActive = location.pathname === `/chats/${data._id}`;
    const activeClass = isActive ? "bg-blue-main" : "";

    return (
        <button
            className={`flex flex-row items-center space-x-4 ${activeClass} rounded-md p-4`}
        >
            {users.length > 1 ? (
                <div>
                    <img
                        className="relative"
                        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Favatars&psig=AOvVaw3-pOhy67lqULxwUlg3GEnh&ust=1701280510428000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIj88fSh54IDFQAAAAAdAAAAABAE"
                        alt="avatar"
                    />
                    <img
                        className="relative"
                        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Favatars&psig=AOvVaw3-pOhy67lqULxwUlg3GEnh&ust=1701280510428000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIj88fSh54IDFQAAAAAdAAAAABAE"
                        alt="avatar"
                    />
                </div>
            ) : (
                <img
                    className="h-10"
                    src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
                    alt="avatar"
                />
            )}
            <div className="flex flex-col font-semibold">
                <h3 className="text-white">{chatName}</h3>
                <p className="text-start text-sm text-gray-400">
                    {latestMessage || "Say hello"}
                </p>
            </div>
        </button>
    );
};

export default ChatsListItem;
