import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { chatReducer } from "./slices/chatSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export * from "./thunks/fetchUser";
export * from "./thunks/fetchChats";
export * from "./thunks/handleSignUser";
