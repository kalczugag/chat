import { Express } from "express";
import requireLogin from "../middlewares/requireLogin";
import { Message, IMessage } from "../models/Message";
import { Chat, IChat } from "../models/Chat";

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
            return res.status(500).send({ message: "Internal Server Error" });
        }
    });

    app.get("/api/chat/:chatId", requireLogin, async (req, res) => {
        const chatId = req.params.chatId;
        const { page = 1, pageSize = 3 }: paginationFetch = req.query;
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

            const reversedMessages = messages.reverse();

            return res.status(200).send(reversedMessages);
        } catch (err: unknown) {
            console.log("Error getting messages: ", err);
            return res.status(500).send({ message: "Internal Server Error" });
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
        const messageBody = req.body;

        try {
            const existingChat = await Chat.findOne({ _id: chatId });

            if (existingChat && chatId === messageBody.chatId) {
                const updatedChat = await Chat.findByIdAndUpdate(
                    chatId,
                    {
                        $set: {
                            latestMessage: messageBody.content,
                        },
                    },
                    { new: true }
                );

                const newMessage = new Message(messageBody);
                await newMessage.save();

                return res.status(200).send({ newMessage, updatedChat });
            }
        } catch (err) {
            console.error("Error finding chat or invalid chatId ", err);
            return res
                .status(404)
                .send({ message: "No such chat or invalid chatId" });
        }
    });
};
