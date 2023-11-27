import { Express } from "express";
import requireLogin from "../middlewares/requireLogin";
import { Message, IMessage } from "../models/Message";
import { Chat, IChat } from "../models/Chat";
import { IUser } from "../models/User";

type paginationFetch = {
    page?: number;
    pageSize?: number;
};

export default (app: Express) => {
    app.get("/api/chat", requireLogin, async (req, res) => {
        const user = req.user;

        try {
            const userChats = await Chat.find({
                users: user,
            });

            return res.status(200).send(userChats);
        } catch (err) {
            console.log("Error getting chats: ", err);
            return res.status(500).send("Internal Server Error");
        }
    });

    app.get("/api/chat/:chatId", requireLogin, async (req, res) => {
        const chatId = req.params.chatId;
        const { page = 1, pageSize = 10 }: paginationFetch = req.query; // Default page is 1, default pageSize is 10

        try {
            const messages = await Message.find(
                {
                    chatId,
                },
                null,
                { sort: { createdAt: -1 } }
            )
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .exec();

            return res.status(200).send(messages);
        } catch (err: unknown) {
            console.log("Error getting messages: ", err);
            return res.status(500).send("Internal Server Error");
        }
    });

    app.post("/api/chat", requireLogin, async (req, res) => {
        const chatBody: IChat = req.body;

        try {
            if (
                !chatBody.isGroupChat ||
                !chatBody.users ||
                chatBody.users.length === 0
            ) {
                return res.status(400).send({ message: "Invalid input data" });
            }

            const newChat = new Chat(chatBody);

            await newChat.save();

            return res.status(200).send(newChat);
        } catch (err: unknown) {
            console.log("Error creating chat ", err);
            return res.status(500).send({ message: "Missing values" });
        }
    });

    app.post("/api/chat/:chatId", requireLogin, async (req, res) => {
        const chatId = req.params.chatId;
        const messageBody: IMessage = req.body;

        console.log(messageBody);
        try {
            const existingChat = await Chat.findOne({ _id: chatId });

            if (existingChat) {
                const newMessage = new Message(messageBody);

                await newMessage.save();

                return res.status(200).send(newMessage);
            }
        } catch (err) {
            console.error("Error finding chat", err);
            return res.status(404).send({ message: "No such chat" });
        }
    });
};
