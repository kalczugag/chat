import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const DashboardPage = () => {
    return (
        <div className="flex flex-row p-2">
            <Sidebar />
            <ChatWindow />
        </div>
    );
};

export default DashboardPage;
