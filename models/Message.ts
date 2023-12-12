import mongoose, { Schema, Types } from "mongoose";

export interface IMessage {
    sender?: Types.ObjectId;
    content?: string;
    chatId?: Types.ObjectId | string;
    readBy: Types.ObjectId;
}

const messageSchema = new Schema<IMessage>(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String, trim: true },
        chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
        readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

export const Message = mongoose.model<IMessage>("message", messageSchema);
