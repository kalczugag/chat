import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removeChat = createAsyncThunk(
    "user/fetch",
    async (chatId: string) => {
        await axios.delete(`/api/chat/${chatId}`);

        return chatId;
    }
);
