import { useState } from "react";
import { Form, Field } from "react-final-form";

type LoginFormProps = {
    onSubmit: (values: object) => void;
};

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const [isUernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const required = (value: string) => (value ? undefined : "Required");

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form className="md:mr-72 space-y-4" onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold">Welcome 👋</h1>
                    <p className="text-gray-400">
                        Set a username and password to get started
                    </p>
                    <div className="relative">
                        <label
                            className={`absolute bg-login-input px-1 rounded text-xs left-4 top-1 ${
                                isUernameFocused ? "hidden" : "block"
                            } text-gray-300 pointer-events-none z-10`}
                        >
                            Username
                        </label>
                        <Field name="username" validate={required}>
                            {({ input }) => (
                                <input
                                    {...input}
                                    className="relative p-2 w-full rounded bg-login-input"
                                    type="text"
                                    onFocus={() => setIsUsernameFocused(true)}
                                    onBlur={() => setIsUsernameFocused(false)}
                                />
                            )}
                        </Field>
                    </div>
                    <div className="relative">
                        <label
                            className={`absolute bg-login-input px-1 rounded text-xs left-4 top-1 ${
                                isPasswordFocused ? "hidden" : "block"
                            } text-gray-300 pointer-events-none z-10`}
                        >
                            Password
                        </label>
                        <Field name="password" validate={required}>
                            {({ input }) => (
                                <input
                                    {...input}
                                    className="relative p-2 w-full rounded bg-login-input"
                                    type="text"
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
                                />
                            )}
                        </Field>
                    </div>
                    <button className="bg-orange-main p-2 w-full rounded">
                        Enter
                    </button>
                </form>
            )}
        />
    );
};

export default LoginForm;
