import { useEffect } from "react";
import { useThunk } from "../hooks/use-thunk";
import { fetchMatchedUsers, IUsers } from "../store";
import { FormValues } from "./NewChatForm";

type TUsersList = {
    data: IUsers[];
    newUser: string;
    onSubmit: (values: FormValues) => void;
    clearInputFn: () => void;
};

const NewChatUsersList = ({
    data,
    newUser,
    onSubmit,
    clearInputFn,
}: TUsersList) => {
    const [doFetchMatchedUsers, isLoading] = useThunk(fetchMatchedUsers);
    const filteredUsersList = data.filter((user) => {
        return (
            user.username.toLowerCase().indexOf(newUser.toLowerCase()) !== -1
        );
    });

    useEffect(() => {
        if (!isLoading && newUser.trim().length > 0) {
            doFetchMatchedUsers(newUser.trim());
        }
    }, [newUser]);

    const renderedMatchedUsers = filteredUsersList?.map((user, index) => {
        if (newUser.trim().length > 0) {
            return (
                <button
                    onClick={() => {
                        onSubmit(user);
                        clearInputFn();
                    }}
                    key={index}
                    className={`w-full text-left p-2 px-2 first ${
                        index === 0 && "bg-login-input hover:opacity-90"
                    } hover:bg-login-input`}
                >
                    {user.username}
                </button>
            );
        }
        return <></>;
    });

    return (
        <div className="mx-6 mr-20 text-gray-200 py-1 bg-login-bg rounded">
            {renderedMatchedUsers}
        </div>
    );
};

export default NewChatUsersList;
