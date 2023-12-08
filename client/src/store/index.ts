import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { chatReducer } from "./slices/chatSlice";
import { socketReducer } from "./slices/socket";
import { messagesReducer } from "./slices/messagesSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        socket: socketReducer,
        messages: messagesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export * from "./slices/chatSlice";
export * from "./slices/socket";
export * from "./slices/messagesSlice";
export * from "./thunks/fetchUser";
export * from "./thunks/fetchChats";
export * from "./thunks/fetchMessages";
export * from "./thunks/handleSignUser";
