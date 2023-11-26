import { useThunk } from "../hooks/use-thunk";
import { handleSignUser } from "../store";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    const [doHandleSignUser] = useThunk(handleSignUser);

    const onSubmit = (values: object) => {
        if (values) {
            doHandleSignUser({ ...values, action: "login" });
        }
    };

    return (
        <div className="flex items-center justify-center bg-login-bg w-screen h-screen text-white">
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
};

export default LoginPage;
