import { useThunk } from "../hooks/use-thunk";
import { handleSignUser } from "../store";
import LoginForm from "../components/LoginForm";

export enum FormAction {
    signin = "login",
    signup = "register",
}

const LoginPage = () => {
    const [doHandleSignUser, isSigning] = useThunk(handleSignUser);

    const onSubmit = (values: object, action: FormAction) => {
        if (values) {
            doHandleSignUser({ ...values, action });
        }
    };

    return (
        <div className="flex items-center justify-center bg-login-bg w-screen h-screen text-white">
            <LoginForm
                onSubmit={onSubmit}
                action={FormAction.signin}
                isLoading={isSigning}
            />
        </div>
    );
};

export default LoginPage;
