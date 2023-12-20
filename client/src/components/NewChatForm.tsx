import { useState } from "react";
import { Form, Field } from "react-final-form";
import { IoAddOutline, IoCloseSharp } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

type FormValues = {
    users?: string;
};

const NewChatForm = () => {
    const [users, setUsers] = useState<any[]>([]);

    const handleSubmit = (values: FormValues) => {
        if (values.users) {
            setUsers((curr) => [...curr, values.users]);
        }
    };

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
                        className="flex flex-row justify-between items-center space-x-2 p-6 rounded-md"
                    >
                        <div className="w-full relative">
                            <Field
                                name="users"
                                component="input"
                                className="w-full p-2 border border-gray-500 shadow-md rounded-md outline-none bg-transparent focus:outline-blue-main focus:shadow-xl"
                            />
                            <div className="absolute right-2 top-0 bottom-0 hidden flex-row items-center space-x-2 text-xl text-gray-400 sm:flex">
                                <button
                                    type="button"
                                    className="border-gray-400 border-r pr-2"
                                >
                                    <MdKeyboardArrowDown />
                                </button>
                                <button type="button">
                                    <IoCloseSharp />
                                </button>
                            </div>
                        </div>
                        <button className="flex items-center justify-center bg-blue-main rounded-md w-12 h-12 p-3 text-xl">
                            <IoAddOutline />
                        </button>
                    </form>
                )}
            />
        </div>
    );
};

export default NewChatForm;
