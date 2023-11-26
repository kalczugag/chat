import { Server } from "socket.io";
import http from "http";
import { Message } from "../models/Message";

export const setupSocketIO = (server: http.Server): Server => {
    const io = new Server(server);

    io.on("connection", (socket) => {
        const chatRoom = "given chat room";

        socket.join(chatRoom);

        io.to(chatRoom).emit("xd");

        //https://socket.io/docs/v4/emitting-events/
        // socket.on("newMessage", async (messageData) => {
        //     const newMessage = new Message(messageData);
        //     await newMessage.save();

        //     io.emit("newMessage", newMessage);
        // });

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });

    return io;
};
