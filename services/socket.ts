import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { IMessage } from "../models/Message";

export default (httpServer: HttpServer) => {
    const io = new Server(httpServer);

    io.on("connection", (socket: Socket) => {
        console.log("user connected ", socket.id);

        socket.on("send_msg", (msg: any) => {
            // io.emit("send_msg", msg);

            socket.broadcast.emit("receive_msg", msg);
            console.log(msg);
        });
    });
};
