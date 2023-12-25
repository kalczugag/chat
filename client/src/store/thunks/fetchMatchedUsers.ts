import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

let lastInput: string | null = null;

export const fetchMatchedUsers = createAsyncThunk(
    "matched-users/fetch",
    async (inputToMatch: string, { getState }) => {
        const state = getState() as RootState;

        if (inputToMatch === lastInput) {
            return state.users.matchedData;
        }

        const response = await axios.get("/api/users", {
            params: {
                match: inputToMatch,
            },
        });

        lastInput = inputToMatch;

        return response.data;
    }
);
