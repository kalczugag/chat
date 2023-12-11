import { createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../thunks/fetchChats";
import { addMessage } from "./messagesSlice";
import { IUser } from "../../../../models/User";

export interface IChatState {
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    users: IUser[];
    latestMessage?: string;
    groupAdmin?: string;
}

export type TChatState = {
    data: null | IChatState[];
    isLoading: boolean;
    isOpen: boolean;
    error: any;
};

const initialState: TChatState = {
    data: null,
    isLoading: false,
    isOpen: true,
    error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChatWindow(state, action) {
            state.isOpen = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchChats.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchChats.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchChats.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(addMessage, (state, action) => {
            const chatIndex = state.data?.findIndex(
                (chat) => chat._id === action.payload.chatId
            );

            if (chatIndex !== undefined && chatIndex !== -1) {
                state.data![chatIndex].latestMessage =
                    action.payload.content.text;
            }
        });
    },
});

export const chatReducer = chatSlice.reducer;
export const { setChatWindow } = chatSlice.actions;
