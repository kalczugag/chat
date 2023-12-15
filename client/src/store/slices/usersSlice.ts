import { createSlice } from "@reduxjs/toolkit";
import { fetchSelectedUser } from "../thunks/fetchSelectedUser";

export interface IUsers {
    _id: string;
    username: string;
    pic?: string;
    isAdmin?: boolean;
}

export interface IUsersState {
    data: null | IUsers[];
    isLoading: boolean;
    error: any;
}

const initialState: IUsersState = {
    data: [],
    isLoading: false,
    error: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchSelectedUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchSelectedUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data?.push(action.payload);
        });
        builder.addCase(fetchSelectedUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const usersReducer = usersSlice.reducer;
