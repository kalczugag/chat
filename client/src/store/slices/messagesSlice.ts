import { createSlice } from "@reduxjs/toolkit";
import { IContentItem } from "../../../../models/ContentItem";

export interface IMsgData {
    sender?: string;
    content?: IContentItem;
    chatId?: string;
    readBy: string;
}

interface IMessages {
    data: IMsgData[];
    isLoading: boolean;
    error: boolean | null;
}

const initialState: IMessages = {
    data: [],
    isLoading: false,
    error: null,
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage(state, action) {
            state.data.push(action.payload);
        },
    },
    extraReducers(builder) {},
});

export const messagesReducer = messagesSlice.reducer;
