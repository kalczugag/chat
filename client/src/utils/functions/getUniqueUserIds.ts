import { IUsers } from "../../store";

export const getUniqueIds = (users: IUsers[], userId: string) => {
    const uniqueIds = new Set();

    users.forEach((user) => {
        if (user._id !== userId) {
            uniqueIds.add(user._id);
        }
    });

    return Array.from(uniqueIds);
};
