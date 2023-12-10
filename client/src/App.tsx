import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useThunk } from "./hooks/use-thunk";
import { useUser } from "./hooks/use-user";
import { fetchUser, setSocket } from "./store";
import { io } from "socket.io-client";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LoadingPage from "./pages/LoadingPage";
import ChatWindow from "./components/ChatWindow";

const App = () => {
    const dispatch = useDispatch();
    const [doFetchUser, isLoadingUser] = useThunk(fetchUser);
    const { user } = useUser();

    useEffect(() => {
        if (!user && !isLoadingUser) {
            doFetchUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doFetchUser, user]);

    useEffect(() => {
        const serverURI =
            process.env.NODE_ENV === "production"
                ? "https://chat-08j1.onrender.com"
                : "http://localhost:5000";

        const socket = io(serverURI, {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            dispatch(setSocket(socket));
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
