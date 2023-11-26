import mongoose, { Schema, Types } from "mongoose";
import { contentItemSchema, IContentItem } from "./ContentItem";

export interface IMessage {
    sender?: Types.ObjectId;
    content?: IContentItem;
    chatId?: Types.ObjectId;
    readBy: Types.ObjectId;
}

const messageSchema = new Schema<IMessage>(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: contentItemSchema, trim: true },
        chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
        readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

export const Message = mongoose.model<IMessage>("message", messageSchema);
