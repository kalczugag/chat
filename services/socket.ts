import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { IMessage } from "../models/Message";

export default (httpServer: HttpServer) => {
    const io = new Server(httpServer);

    io.on("connection", (socket: Socket) => {
        socket.on("send-msg", (msg: IMessage) => {
            console.log(msg);

            io.emit("send-msg", msg);
        });
    });
};
