import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "../thunks/fetchMessages";

export interface IMsgData {
    _id?: string;
    sender?: string;
    content?: string;
    chatId?: string;
    readBy?: string[] | any;
}

interface IMessages {
    data: IMsgData[];
    historyData: IMsgData[];
    isLoading: boolean;
    error: any;
}

const initialState: IMessages = {
    data: [],
    historyData: [],
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
        });
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.isLoading = false;

            const newMessageIds = new Set(
                action.payload.map((msg: IMsgData) => msg._id)
            );

            const uniqueMessages = action.payload.filter((msg: IMsgData) => {
                return newMessageIds.has(msg._id);
            });

            // Update the state with the new concatenated array
            state.data = [...state.data, ...uniqueMessages];
        });

        builder.addCase(fetchMessages.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const messagesReducer = messagesSlice.reducer;
export const { addMessage } = messagesSlice.actions;
