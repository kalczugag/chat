import { Form } from "react-final-form";
import InputField from "./InputField";
import { FormAction } from "../pages/LoginPage";

type LoginFormProps = {
    onSubmit: (values: object, action: FormAction) => void;
    action: FormAction;
    isLoading: boolean;
};

const LoginForm = ({ onSubmit, action, isLoading }: LoginFormProps) => {
    return (
        <Form
            onSubmit={(values) => onSubmit(values, action)}
            render={({ handleSubmit }) => (
                <form className="md:mr-72 space-y-4" onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold">Welcome 👋</h1>
                    <p className="text-gray-400">
                        Set a username and password to get started
                    </p>
                    <InputField name="username" />
                    <InputField name="password" />
                    <button
                        className="bg-orange-main p-2 w-full rounded"
                        disabled={isLoading}
                    >
                        Enter
                    </button>
                </form>
            )}
        />
    );
};

export default LoginForm;
