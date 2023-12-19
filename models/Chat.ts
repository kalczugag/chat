import mongoose, { Schema, Types } from "mongoose";

export interface IChat {
    _id?: string;
    chatName: string;
    isGroupChat: boolean;
    users: Types.ObjectId[];
    latestMessage?: string;
    groupAdmin?: Types.ObjectId;
}

const chatSchema = new Schema<IChat>(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [{ type: Schema.Types.ObjectId, ref: "User" }],
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
