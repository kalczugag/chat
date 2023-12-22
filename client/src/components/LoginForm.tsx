import { Form } from "react-final-form";
import { FormAction } from "../pages/LoginPage";
import InputField from "./LoginInputField";

type TLoginFormProps = {
    onSubmit: (values: object, action: FormAction) => void;
    action: FormAction;
    isLoading: boolean;
};

const LoginForm = ({ onSubmit, action, isLoading }: TLoginFormProps) => {
    return (
        <Form
            onSubmit={(values) => onSubmit(values, action)}
            render={({ handleSubmit }) => (
                <form className="space-y-4 text-white" onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold">Welcome 👋</h1>
                    <p className="text-gray-400">
                        Set a username and password to {action}
                    </p>
                    <InputField name="username" type="text" />
                    <InputField name="password" type="password" />
                    <button
                        className="bg-orange-main p-2 w-full rounded hover:opacity-90"
                        disabled={isLoading}
                    >
                        {action === "login" ? "Log in" : "Sign up"}
                    </button>
                </form>
            )}
        />
    );
};

export default LoginForm;
