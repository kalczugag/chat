import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../thunks/fetchUser";
import { handleSignUser } from "../thunks/handleSignUser";
import { IUser } from "../../../../models/User";

export interface IAuthState {
    user: null | IUser;
    isLoading: boolean;
    error: any;
}

const initialState: IAuthState = {
    user: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(handleSignUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(handleSignUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(handleSignUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const authReducer = authSlice.reducer;
