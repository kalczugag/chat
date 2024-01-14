import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNav } from "../../hooks/use-nav";

interface Props {
    username: string;
    password: string;
    pic?: string;
    signType: string;
}

export const handleSignUser = createAsyncThunk(
    "user/sign",
    async (data: Props) => {
        const response = await axios.post("/api/auth/sign", data);
        useNav("/");

        return response.data;
    }
);
