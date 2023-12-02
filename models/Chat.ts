import mongoose, { Schema, Types } from "mongoose";

export interface IChat {
    chatName: string;
    isGroupChat: boolean;
    users: Types.ObjectId[];
    latestMessage?: Types.ObjectId;
    groupAdmin?: Types.ObjectId;
}

const chatSchema = new Schema<IChat>(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [{ type: Schema.Types.ObjectId, ref: "User" }],
        latestMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
            default: "Say Hello",
            required: false,
        },
        groupAdmin: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export const Chat = mongoose.model<IChat>("chat", chatSchema);
