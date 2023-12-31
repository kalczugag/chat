import { IoCloseSharp } from "react-icons/io5";

type Props = {
    user: any;
    index: number;
    removeUser: (userIndex: number) => void;
};

const TagListItem = ({ removeUser, index, user }: Props) => {
    return (
        <li
            key={index}
            className="flex items-center justify-between bg-gray-200 text-black p-1 pl-2 m-1"
        >
            <span>{user.username}</span>
            <button
                type="button"
                onClick={() => removeUser(index)}
                className="text-gray-400 px-1"
            >
                <IoCloseSharp />
            </button>
        </li>
    );
};

export default TagListItem;
