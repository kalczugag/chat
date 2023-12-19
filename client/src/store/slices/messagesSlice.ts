import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "../thunks/fetchMessages";
import { addMessageToDB } from "../thunks/addMessageToDB";

export interface IMsgData {
    _id?: string;
    sender?: string;
    content?: string;
    chatId?: string;
    readBy?: string[] | any;
}

interface IMessages {
    data: IMsgData[];
    isLoading: boolean;
    error: any;
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
    extraReducers(builder) {
        builder.addCase(fetchMessages.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.isLoading = false;

            if (
                action.meta.arg.page === 1 &&
                action.payload.length > 0 &&
                state.data.length === 0
            ) {
                state.data = action.payload;
            } else {
                state.data = action.payload.concat(state.data);
            }
        });

        builder.addCase(fetchMessages.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(addMessageToDB.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(addMessageToDB.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(addMessageToDB.rejected, (state, action) => {
            state.isLoading = false;
        });
    },
});

export const messagesReducer = messagesSlice.reducer;
export const { addMessage } = messagesSlice.actions;
