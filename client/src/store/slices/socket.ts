import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

export interface ISocketState {
    socket: Socket | null;
}

const initialState: ISocketState = {
    socket: null,
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocket(state, action) {
            state.socket = action.payload;
        },
    },
});

export const socketReducer = socketSlice.reducer;
export const { setSocket } = socketSlice.actions;
