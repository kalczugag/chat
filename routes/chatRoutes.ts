import { Express } from "express";
import requireLogin from "../middlewares/requireLogin";
import { Message } from "../models/Message";
import { Chat, IChat } from "../models/Chat";

type paginationFetch = {
    page?: number;
    pageSize?: number;
};

export default (app: Express) => {
    app.get("/api/chat", requireLogin, async (req, res) => {
        try {
            const user = req.user;

            const userChats = await Chat.find({
                users: user,
            });

            res.status(200).send(userChats);
        } catch (err) {
            console.log("Error getting chats: ", err);
            res.status(500).send({ message: "Internal Server Error" });
        }
    });

    app.get("/api/chat/:chatId", requireLogin, async (req, res) => {
        try {
            const chatId = req.params.chatId;
            const { page = 1, pageSize = 10 }: paginationFetch = req.query;

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

            res.status(200).send(reversedMessages);
        } catch (err: unknown) {
            console.log("Error getting messages: ", err);
            res.status(500).send({ message: "Internal Server Error" });
        }
    });

    app.post("/api/chat", requireLogin, async (req, res) => {
        try {
            const chatBody: IChat = req.body;
            console.log(chatBody);

            if (!chatBody.users || chatBody.users.length === 0) {
                return res.status(400).send({ message: "Invalid input data" });
            }

            const newChat = new Chat(chatBody);

            await newChat.save();

            res.status(200).send(newChat);
        } catch (err: unknown) {
            console.log("Error creating chat ", err);
            res.status(500).send({ message: "Missing values" });
        }
    });

    app.post("/api/chat/:chatId", requireLogin, async (req, res) => {
        try {
            const chatId = req.params.chatId;
            const messageBody = req.body;

            if (messageBody.content.trim().length !== 0) {
                const existingChat = await Chat.findOne({ _id: chatId });

                if (existingChat && chatId === messageBody.chatId) {
                    await Chat.findByIdAndUpdate(
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

                    res.status(200).send(newMessage);
                }
            }
        } catch (err) {
            console.error("Error finding chat or invalid chatId ", err);
            res.status(404).send({ message: "No such chat or invalid chatId" });
        }
    });

    app.put("/api/chat", requireLogin, async (req, res) => {
        try {
            const { _id, chatName, isGroupChat, users }: IChat = req.body;

            const updatedChat = await Chat.findByIdAndUpdate(
                _id,
                {
                    $set: { chatName, isGroupChat, users },
                },
                { new: true }
            );

            res.status(200).send(updatedChat);
        } catch (err: unknown) {
            console.log("Error in updating the chat: ", err);
            res.status(500).send({ message: "Server error" });
        }
    });

    app.delete("/api/chat/:chatId", async (req, res) => {
        try {
            const chatId = req.params.chatId;

            await Chat.deleteOne({ _id: chatId });
            res.status(200).send({
                message: `Successfully removed chat with id ${chatId}`,
            });
        } catch (err: unknown) {
            console.log("Error deleting chat: ", err);
            res.status(500).send({ message: "Server error" });
        }
    });
};
