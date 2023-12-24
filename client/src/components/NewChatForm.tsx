import { useState } from "react";
import { Form, Field } from "react-final-form";
import { IoAddOutline, IoCloseSharp } from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import NewChatUsersList from "./NewChatUsersList";

type FormValues = {
    name?: string;
};

const NewChatForm = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [isOpenList, setIsOpenList] = useState<boolean>(false);

    const handleSubmit = (values: FormValues) => {
        if (values.name) {
            setUsers((curr) => [...curr, values.name]);
        }
    };

    const handleRemoveUser = (userIndex: number) => {
        setUsers([...users.filter((_, index) => userIndex !== index)]);
    };

    const handleClearUsers = () => {
        setUsers([]);
    };

    const handleOpenList = () => {
        setIsOpenList(!isOpenList);
    };

    const renderedUsersTags = users.map((user, index) => {
        return (
            <li
                key={index}
                className="flex items-center justify-between bg-gray-200 text-black p-1 pl-2 m-1"
            >
                <span>{user}</span>
                <button
                    type="button"
                    onClick={() => handleRemoveUser(index)}
                    className="text-gray-400 px-1"
                >
                    <IoCloseSharp />
                </button>
            </li>
        );
    });

    return (
        <div className="w-full h-full bg-gradient-to-b from-transparent to-login-input text-white rounded-md">
            <Form
                onSubmit={handleSubmit}
                render={({ handleSubmit, form, form: { getState } }) => (
                    <form
                        onSubmit={(event) => {
                            handleSubmit(event);
                            form.reset();
                        }}
                        className="flex flex-row justify-center items-center space-x-2 p-6 rounded-md"
                    >
                        <div className="flex flex-row justify-between p-2 border w-full border-gray-500 shadow-md rounded-md outline-none bg-transparent focus-within:border-blue-main focus-within:shadow-xl">
                            <div className="flex flex-wrap justify-start w-full">
                                <ul className="relative flex flex-wrap">
                                    {renderedUsersTags}
                                    {isOpenList && (
                                        <NewChatUsersList
                                            newUser={
                                                getState().values.name || ""
                                            }
                                        />
                                    )}
                                </ul>
                                <Field
                                    name="name"
                                    component="input"
                                    placeholder="Press enter to add user"
                                    className="flex-1 p-1 px-2 bg-transparent outline-none"
                                />
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
                        <button className="flex items-center justify-center bg-blue-main rounded-md w-50px h-50px text-xl">
                            <IoAddOutline />
                        </button>
                    </form>
                )}
            />
        </div>
    );
};

export default NewChatForm;
