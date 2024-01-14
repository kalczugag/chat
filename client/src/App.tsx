import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useThunk } from "./hooks/use-thunk";
import { useUser } from "./hooks/use-user";
import { fetchUser, setSocket } from "./store";
import { io } from "socket.io-client";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LoadingPage from "./pages/LoadingPage";
import ChatWindow from "./components/ChatWindow";
import NewChatPage from "./pages/NewChatPage";
import ChatEditForm from "./components/ChatEditForm";

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [doFetchUser, isLoadingUser, userError] = useThunk(fetchUser);
    const { user } = useUser();

    useEffect(() => {
        if (!user && !isLoadingUser && !userError) {
            doFetchUser();
        }

        if (location.pathname === "/" && userError) {
            console.error(
                "Failed to get the current logged in user: ",
                userError
            );
            window.location.href = "/login";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doFetchUser, user, userError]);

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
                    <Route path="/new" element={<NewChatPage />} />
                    <Route path="/edit" element={<ChatEditForm />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<LoginPage />} />
            </Routes>
        </div>
    );
};

export default App;
