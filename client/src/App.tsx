import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useThunk } from "./hooks/use-thunk";
import { useUser } from "./hooks/use-user";
import { fetchUser } from "./store";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LoadingPage from "./pages/LoadingPage";
import ChatWindow from "./components/ChatWindow";

const App = () => {
    const [doFetchUser, isLoadingUser] = useThunk(fetchUser);
    const { user } = useUser();

    useEffect(() => {
        if (!user && !isLoadingUser) {
            doFetchUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doFetchUser, user]);

    if (isLoadingUser) {
        return <LoadingPage />;
    }

    return (
        <div className="h-screen w-screen bg-login-bg">
            {/* {isLoadingUser ? <Navigate to="/login" /> : <Navigate to="/" />} */}
            <Routes>
                <Route path="/" element={<DashboardPage />}>
                    <Route path="/chats/:chatId" element={<ChatWindow />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
    );
};

export default App;
