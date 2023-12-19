import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IMsgData } from "../slices/messagesSlice";

export const addMessageToDB = createAsyncThunk(
    "messages/add",
    async (data: IMsgData) => {
        const response = await axios.post(`/api/chat/${data.chatId}`, data);

        return response.data;
    }
);
