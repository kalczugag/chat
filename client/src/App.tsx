import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useThunk } from "./hooks/use-thunk";
import { useUser } from "./hooks/use-user";
import { fetchUser } from "./store";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LoadingPage from "./pages/LoadingPage";

const App = () => {
    const [doFetchUser, isLoadingUser] = useThunk(fetchUser);
    const { user } = useUser();

    useEffect(() => {
        if (!user && !isLoadingUser) {
            doFetchUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doFetchUser, user]);

    if (!user) {
        return <LoadingPage />;
    }

    return (
        <div className="h-screen w-screen bg-login-bg">
            {!user ? <Navigate to="/login" /> : <Navigate to="/" />}
            <Routes>
                <Route index path="/" element={<DashboardPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
    );
};

export default App;
