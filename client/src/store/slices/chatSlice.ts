import { createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../thunks/fetchChats";
import { IChat } from "../../../../models/Chat";

export type ChatState = {
    data: null | IChat;
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
