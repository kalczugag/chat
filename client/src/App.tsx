import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useThunk } from "./hooks/use-thunk";
import { useUser } from "./hooks/use-user";
import { fetchUser } from "./store";
import { io, Socket } from "socket.io-client";
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

    useEffect(() => {
        const socket = io("http://localhost:5000", {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log(socket);
        });
    }, []);

    if (isLoadingUser) {
        return <LoadingPage />;
    }

    return (
        <div className="h-screen bg-login-bg">
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
