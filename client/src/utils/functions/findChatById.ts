import { RootState, IChatState } from "../../store";

export const findChatById = (
    state: RootState,
    chatId: string
): IChatState | undefined => {
    const chatData = state.chat.data;

    if (chatData) {
        const index = chatData.findIndex((chat) => chat._id === chatId);

        if (index !== -1) {
            return chatData[index];
        }
    }

    return undefined;
};
