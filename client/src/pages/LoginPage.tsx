import { useLocation, Link } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { handleSignUser } from "../store";
import LoginForm from "../components/LoginForm";

export enum FormAction {
    signin = "login",
    signup = "register",
}

const LoginPage = () => {
    const location = useLocation();
    const [doHandleSignUser, isSigning] = useThunk(handleSignUser);

    const onSubmit = (values: object, action: FormAction) => {
        if (values) {
            doHandleSignUser({ ...values, action });
        }
    };

    const actionPicker = location.pathname.startsWith("/login")
        ? FormAction.signin
        : FormAction.signup;

    return (
        <div className="flex flex-col items-center justify-center bg-login-bg w-screen h-screen md:pr-72">
            <LoginForm
                onSubmit={onSubmit}
                action={actionPicker}
                isLoading={isSigning}
            />
            {actionPicker === FormAction.signin && (
                <div className="text-md text-gray-400">
                    <span>Don't have an account?</span>{" "}
                    <Link
                        className="text-blue-main hover:hover:opacity-90"
                        to="/signup"
                    >
                        Sign up
                    </Link>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
