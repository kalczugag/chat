import { useSelector } from "react-redux";
import { IAuthState } from "../store/slices/authSlice";
import { RootState } from "../store";

export const useUser = () => {
    const userData: IAuthState = useSelector((state: RootState) => state.auth);

    return {
        user: userData.user,
        admin: userData.user?.isAdmin,
        isLoading: userData.isLoading,
    };
};
