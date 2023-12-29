import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "./User";

export interface IChat {
    _id?: string;
    chatName: string;
    isGroupChat: boolean;
    users: IUser[];
    latestMessage?: string;
    groupAdmin?: Types.ObjectId;
}

const chatSchema = new Schema<IChat>(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [
            {
                _id: {
                    type: String,
                    required: true,
                },
                username: { type: String, required: true },
            },
        ],
        latestMessage: {
            type: String,
            default: "Say Hello",
            required: false,
        },
        groupAdmin: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export const Chat = mongoose.model<IChat>("chat", chatSchema);
