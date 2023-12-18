import { Form, Field } from "react-final-form";

const NewChatForm = () => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <Form
            onSubmit={handleSubmit}
            render={({ handleSubmit }) => (
                <form
                    onSubmit={handleSubmit}
                    className="w-full bg-gradient-to-b from-transparent to-login-input text-white p-6 h-full rounded-md"
                >
                    <Field
                        name="users"
                        component="input"
                        className="w-full p-2 border border-gray-500 shadow-md rounded-md outline-none bg-transparent focus:outline-blue-main focus:shadow-xl"
                    />
                </form>
            )}
        />
    );
};

export default NewChatForm;
