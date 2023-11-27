import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChats = createAsyncThunk("chats/fetch", async () => {
    const response = await axios.get("/api/chat");

    return response.data;
});
