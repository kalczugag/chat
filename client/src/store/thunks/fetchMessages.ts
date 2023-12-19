import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IFetchMessagesProps {
    chatId: string;
    page?: number;
    pageSize?: number;
}

export const fetchMessages = createAsyncThunk(
    "messages/fetch",
    async ({ chatId, page, pageSize }: IFetchMessagesProps) => {
        const response = await axios.get(`/api/chat/${chatId}`, {
            params: { page, pageSize },
        });

        return response.data;
    }
);
