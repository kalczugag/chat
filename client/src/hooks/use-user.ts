import { useSelector } from "react-redux";
import { AuthState } from "../store/slices/authSlice";

export const useUser = () => {
    const userData: AuthState = useSelector((state: any) => state.auth);

    return { user: userData.user, admin: userData.user?.isAdmin };
};
