import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { IMessage } from "../models/Message";

export default (httpServer: HttpServer) => {
    const io = new Server(httpServer);
    const userSocketMap = new Map<string, string>(); // Map to store user IDs and socket IDs

    io.on("connection", (socket: Socket) => {
        //Messages types:
        //private message ex. ('priv/userId')
        //group chat message ex. ('group/groupId')

        socket.on("join_group", (groupId: string) => {
            socket.join(`group/${groupId}`);
        });

        socket.on("set_user_id", (userId: string) => {
            // Store the user ID and socket ID in the map
            userSocketMap.set(userId, socket.id);
        });

        socket.on("send_msg", (msg: any, to: string) => {
            console.log(to);
            if (to.startsWith("group")) {
                console.log(msg);
                socket.broadcast.to(to).emit("receive_msg", msg);
            } else {
                const recipientSocketId = userSocketMap.get(to);

                if (recipientSocketId) {
                    // Emit the private message to the specific recipient
                    io.to(recipientSocketId).emit(
                        "private_msg",
                        socket.id,
                        msg
                    );
                } else {
                    // Handle the case where the recipient's socket ID is not found
                    console.error(`Socket ID not found for user ID: ${to}`);
                }
            }
        });

        socket.on("disconnect", () => {
            // Remove the user ID and socket ID mapping when a user disconnects
            userSocketMap.forEach((value, key) => {
                if (value === socket.id) {
                    userSocketMap.delete(key);
                }
            });
        });
    });
};
