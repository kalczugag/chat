import { createSlice } from "@reduxjs/toolkit";
import { fetchSelectedUser } from "../thunks/fetchSelectedUser";
import { fetchMatchedUsers } from "../thunks/fetchMatchedUsers";

export interface IUsers {
    _id: string;
    username: string;
    pic?: string;
    isAdmin?: boolean;
}

export interface IUsersState {
    data: null | IUsers[];
    matchedData: null | IUsers[];
    isLoading: boolean;
    error: any;
}

const initialState: IUsersState = {
    data: [],
    matchedData: [],
    isLoading: false,
    error: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearMatchedData(state) {
            state.matchedData = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchSelectedUser.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchSelectedUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data?.push(action.payload);
        });
        builder.addCase(fetchSelectedUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(fetchMatchedUsers.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchMatchedUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.matchedData = action.payload;
        });
        builder.addCase(fetchMatchedUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const usersReducer = usersSlice.reducer;
export const { clearMatchedData } = usersSlice.actions;
