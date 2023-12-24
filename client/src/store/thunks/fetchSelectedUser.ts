import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSelectedUser = createAsyncThunk(
    "selectedUser/fetch",
    async (userId: string) => {
        const response = await axios.get(`/api/user/${userId}`);

        return response.data;
    }
);
