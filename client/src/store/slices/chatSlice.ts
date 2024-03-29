import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../thunks/fetchChats";
import { addMessageToDB } from "../thunks/addMessageToDB";
import { addChat } from "../thunks/addChat";
import { removeChat } from "../thunks/removeChat";
import { addMessage } from "./messagesSlice";
import { IUsers } from "./usersSlice";

export interface IChatState {
    _id?: string;
    chatName: string;
    isGroupChat: boolean;
    users: IUsers[];
    latestMessage?: string;
    groupAdmin?: string;
}

export type TChatState = {
    data: null | IChatState[];
    isLoading: boolean;
    isOpen: boolean;
    isOnline: boolean;
    lastPage: number;
    error: any;
};

const initialState: TChatState = {
    data: null,
    isLoading: false,
    isOpen: true,
    isOnline: false,
    lastPage: 1,
    error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChatWindow(state, action) {
            state.isOpen = action.payload;
        },
        changeLastPage(state, action) {
            state.lastPage = action.payload;
        },
        changeStatus(state, action) {
            state.isOnline = action.payload;
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

        builder.addCase(addChat.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addChat.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data?.push(action.payload);
        });
        builder.addCase(addChat.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(addMessageToDB.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addMessageToDB.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(addMessageToDB.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(removeChat.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removeChat.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data!.filter((chat: IChatState) => {
                return chat._id !== action.payload;
            });
        });
        builder.addCase(removeChat.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(addMessage, (state, action) => {
            const chatIndex = state.data?.findIndex(
                (chat) => chat._id === action.payload.chatId
            );

            if (chatIndex !== undefined && chatIndex !== -1) {
                state.data![chatIndex].latestMessage = action.payload.content;
            }
        });
    },
});

export const chatReducer = chatSlice.reducer;
export const { setChatWindow, changeLastPage, changeStatus } =
    chatSlice.actions;
