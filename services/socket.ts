import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { Message } from "../models/Message";
import { Chat } from "../models/Chat";

export default (httpServer: HttpServer) => {
    const io = new Server(httpServer);
    const userSocketMap = new Map<string, string>(); // Map to store user IDs and socket IDs
    let chatId: string;

    io.on("connection", (socket: Socket) => {
        //Messages types:
        //private message ex. ('priv/userId')
        //group chat message ex. ('group/groupId')

        socket.on("join_group", (groupId: string) => {
            socket.join(`group/${groupId}`);
            chatId = groupId;
        });

        socket.on("set_user_id", (userId: string) => {
            // Store the user ID and socket ID in the map
            userSocketMap.set(`priv/${userId}`, socket.id);
        });

        socket.on("send_msg", async (msg: any, to: string) => {
            if (to.startsWith("group")) {
                socket.broadcast.to(to).emit("receive_msg", msg);
            } else {
                const recipientSocketId = userSocketMap.get(to);
                console.log(recipientSocketId, userSocketMap);

                if (recipientSocketId) {
                    // Emit the private message to the specific recipient
                    io.to(recipientSocketId).emit("private_msg", msg);
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
