import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMessages = createAsyncThunk(
    "messages/fetch",
    async (chatId: string) => {
        const response = await axios.get(`/api/chat/${chatId}`);

        return response.data;
    }
);
