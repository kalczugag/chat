import { useState } from "react";
import { Form, Field } from "react-final-form";
import { useUser } from "../hooks/use-user";
import { IoAddOutline, IoCloseSharp } from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import NewChatUsersList from "./NewChatUsersList";
import TagListItem from "./TagListItem";

type Props = {
    usersData?: any[];
    onSubmit: (...args: any) => void;
    action: (...args: any) => void;
    isLoading?: boolean;
};

export type FormValues = {
    username: string;
    handleSubmit?: () => void;
    handleAction?: (values: FormValues) => void;
};

export enum HoverAction {
    On = -1,
    Out = -2,
}

const NewChatForm = ({ usersData, onSubmit, action }: Props) => {
    const { user } = useUser();
    const [users, setUsers] = useState<any[]>([] || usersData);
    const [isOpenList, setIsOpenList] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const data = useSelector((state: RootState) => state.users.matchedData);

    if (!data || !user) {
        return <div>Loading...</div>;
    }

    const handleRemoveUser = (userIndex: number) => {
        setUsers([...users.filter((_, index) => userIndex !== index)]);
    };

    const handleClearUsers = () => {
        setUsers([]);
        setIsOpenList(false);
    };

    const handleOpenList = () => {
        if (data.length > 0) {
            setSelectedIndex(0);
            setIsOpenList(!isOpenList);
        }
    };
    const handlehoverOverList = (action: number) => {
        const prevIndex = selectedIndex;

        if (action === HoverAction.On) {
            setSelectedIndex(HoverAction.On);
        } else if (action === HoverAction.Out) {
            setSelectedIndex(prevIndex);
        }
    };

    const handleIndexChange = (
        event: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        event.preventDefault();
        if (index >= 0 && index <= data.length - 1) {
            setSelectedIndex(index);
        }
    };

    const renderedUsersTags = users.map((user, index) => {
        return (
            <TagListItem
                key={index}
                user={user}
                index={index}
                removeUser={handleRemoveUser}
            />
        );
    });

    return (
        <div className="w-full h-full bg-gradient-to-b from-transparent to-login-input text-white rounded-md">
            <Form
                onSubmit={() => onSubmit({ users, handleClearUsers })}
                render={({ handleSubmit, form }) => (
                    <>
                        <form
                            onSubmit={(event) => {
                                handleSubmit(event);
                                form.reset();
                            }}
                            className="flex flex-row justify-center items-center space-x-2 p-6 rounded-md"
                        >
                            <div className="flex flex-row justify-between p-2 border w-full border-gray-500 shadow-md rounded-md outline-none bg-transparent focus-within:border-blue-main focus-within:shadow-xl">
                                <div className="flex flex-wrap justify-start w-full">
                                    <ul className="flex flex-wrap">
                                        {renderedUsersTags}
                                    </ul>
                                    <Field name="username">
                                        {(props) => (
                                            <input
                                                {...props.input}
                                                type="text"
                                                className="flex-1 p-1 px-2 bg-transparent outline-none"
                                                placeholder="Press enter to add user"
                                                onFocus={() => {
                                                    setIsOpenList(true);
                                                    setSelectedIndex(0);
                                                }}
                                                onBlur={() =>
                                                    setIsOpenList(false)
                                                }
                                                onKeyDown={(
                                                    event: React.KeyboardEvent<HTMLInputElement>
                                                ) => {
                                                    if (event.key === "Enter") {
                                                        event.preventDefault();
                                                        action(
                                                            data[selectedIndex],
                                                            {
                                                                users,
                                                                setUsers,
                                                                setSelectedIndex,
                                                            }
                                                        );
                                                        form.reset();
                                                    } else if (
                                                        event.key ===
                                                        "ArrowDown"
                                                    ) {
                                                        handleIndexChange(
                                                            event,
                                                            selectedIndex + 1
                                                        );
                                                    } else if (
                                                        event.key === "ArrowUp"
                                                    ) {
                                                        handleIndexChange(
                                                            event,
                                                            selectedIndex - 1
                                                        );
                                                    }
                                                }}
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div className="hidden flex-row items-center space-x-2 text-xl text-gray-400 sm:flex">
                                    <button
                                        type="button"
                                        onClick={handleOpenList}
                                        className="border-gray-400 border-r pr-2"
                                    >
                                        {isOpenList ? (
                                            <MdKeyboardArrowUp />
                                        ) : (
                                            <MdKeyboardArrowDown />
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleClearUsers();
                                            form.reset();
                                        }}
                                    >
                                        <IoCloseSharp />
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={false}
                                className="flex items-center justify-center bg-blue-main rounded-md w-50px h-50px text-xl"
                            >
                                <IoAddOutline />
                            </button>
                        </form>
                        {isOpenList && (
                            <NewChatUsersList
                                data={data}
                                newUser={
                                    form.getFieldState("username")?.value || ""
                                }
                                selectedIndex={selectedIndex}
                                onSubmit={action}
                                onHoverFn={handlehoverOverList}
                                clearInputFn={() => form.reset()}
                            />
                        )}
                    </>
                )}
            />
        </div>
    );
};

export default NewChatForm;
