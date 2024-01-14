import { useUser } from "../hooks/use-user";
import { useThunk } from "../hooks/use-thunk";
import { addChat } from "../store";
import { FormValues } from "../components/NewChatForm";
import NewChatForm from "../components/NewChatForm";

type handleAddUserProps = {
    users: any[];
    setUsers: React.Dispatch<React.SetStateAction<any[]>>;
    setSelectedIndex: (value: React.SetStateAction<number>) => void;
};

type handleSubmitProps = {
    users: any[];
    handleClearUsers: () => void;
};

const NewChatPage = () => {
    const { user } = useUser();
    const [doAddChat, isAddingChat] = useThunk(addChat);

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleAddUser = (
        values: FormValues,
        { users, setUsers, setSelectedIndex }: handleAddUserProps
    ) => {
        const userExists = users.some((user) => {
            return user.username === values.username;
        });

        if (values?.username && !userExists) {
            setUsers((curr) => [...curr, values]);
        }

        setSelectedIndex(0);
    };

    const handleSubmit = ({ users, handleClearUsers }: handleSubmitProps) => {
        if (users.length > 0) {
            const isGroup = users.length > 1 ? true : false;

            const data = {
                chatName: "New Chat",
                isGroupChat: isGroup,
                users: users.concat({ _id: user._id, username: user.username }),
                groupAdmin: user._id,
            };

            try {
                doAddChat(data);
            } catch (err: unknown) {
                console.error(err);
            }

            handleClearUsers();
        }
    };

    return (
        <NewChatForm
            onSubmit={handleSubmit}
            action={handleAddUser}
            isLoading={isAddingChat}
        />
    );
};

export default NewChatPage;
