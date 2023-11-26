import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ISignUser {
    username: string;
    password: string;
    pic?: string;
    signType: string;
}

export const handleSignUser = createAsyncThunk(
    "user/sign",
    async (data: ISignUser) => {
        const response = await axios.post("/api/auth/sign", data);

        return response.data;
    }
);
