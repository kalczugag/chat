import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useThunk } from "./hooks/use-thunk";
import { useUser } from "./hooks/use-user";
import { fetchUser } from "./store";
import LoginPage from "./pages/LoginPage";

const App = () => {
    const [doFetchUser, isLoadingUser] = useThunk(fetchUser);
    const { user } = useUser();

    useEffect(() => {
        if (!user && !isLoadingUser) {
            doFetchUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doFetchUser, user]);

    return (
        <div>
            {!user && <Navigate to="/login" />}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
    );
};

export default App;
