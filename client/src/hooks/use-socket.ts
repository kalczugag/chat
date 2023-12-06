import { useSelector } from "react-redux";
import { ISocketState } from "../store/slices/socket";
import { RootState } from "../store";

export const useSocket = () => {
    const { socket }: ISocketState = useSelector(
        (state: RootState) => state.socket
    );

    if (socket) {
        return socket;
    }

    return { msg: "No socket found" };
};
