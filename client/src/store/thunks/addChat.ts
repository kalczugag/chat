import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IChatState } from "../slices/chatSlice";

export const addChat = createAsyncThunk(
    "chats/add",
    async (data: IChatState) => {
        const response = await axios.post("/api/chat", data);

        return response.data;
    }
);
