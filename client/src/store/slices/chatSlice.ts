import { createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../thunks/fetchChats";
import { IUser } from "../../../../models/User";

export interface IChatState {
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    users: IUser[];
    latestMessage?: string;
    groupAdmin?: string;
}

export type ChatState = {
    data: null | IChatState[];
    isLoading: boolean;
    error: any;
};

const initialState: ChatState = {
    data: null,
    isLoading: false,
    error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
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
    },
});

export const chatReducer = chatSlice.reducer;
