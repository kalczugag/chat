import { useSelector } from "react-redux";
import { AuthState } from "../store/slices/authSlice";
import { RootState } from "../store";

export const useUser = () => {
    const userData: AuthState = useSelector((state: RootState) => state.auth);

    return { user: userData.user, admin: userData.user?.isAdmin };
};
