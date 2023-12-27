import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TPropsToFetch = {
    _id?: boolean;
    username?: boolean;
    password?: boolean;
    pic?: boolean;
    isAdmin?: boolean;
};

export const fetchUser = createAsyncThunk(
    "user/fetch",
    async (data: TPropsToFetch) => {
        let response;

        if (data) {
            response = await axios.get("/api/user/:userId", {
                params: data,
            });
        } else {
            response = await axios.get("/api/auth/current_user");
        }

        return response.data;
    }
);
