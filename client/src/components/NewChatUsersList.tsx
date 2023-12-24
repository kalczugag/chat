import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { fetchMatchedUsers, clearMatchedData, RootState } from "../store";
import { useSelector } from "react-redux";

type TUsersList = {
    newUser: string;
};

const NewChatUsersList = ({ newUser }: TUsersList) => {
    const dispatch = useDispatch();
    const [doFetchMatchedUsers, isLoading] = useThunk(fetchMatchedUsers);
    const data = useSelector((state: RootState) => state.users.matchedData);

    useEffect(() => {
        if (!isLoading && newUser.trim().length > 0) {
            doFetchMatchedUsers(newUser.trim());
        }

        if (newUser.trim().length <= 0) {
            dispatch(clearMatchedData());
        }
    }, [newUser]);

    const renderedMatchedUsers = data?.map((user) => {
        return <li>{user.username}</li>;
    });

    return (
        <div className="absolute -left-2 -bottom-24">
            <ul className="text-black p-2 bg-gray-300 rounded">
                {renderedMatchedUsers}
            </ul>
        </div>
    );
};

export default NewChatUsersList;
