import { IMsgData } from "../../store";

export const getUniqueIds = (msgs: IMsgData[], userId: string) => {
    const uniqueIds = new Set();

    msgs.forEach((obj) => {
        if (obj.sender !== userId) {
            uniqueIds.add(obj.sender);
        }
    });

    return Array.from(uniqueIds);
};
