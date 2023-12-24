import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMatchedUsers = createAsyncThunk(
    "matched-users/fetch",
    async (inputToMatch: string) => {
        const response = await axios.get("/api/users", {
            params: {
                match: inputToMatch,
            },
        });

        return response.data;
    }
);
