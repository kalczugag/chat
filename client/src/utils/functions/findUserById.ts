import { RootState, IUsers } from "../../store";

export const findUserById = (
    state: RootState,
    userId: string
): IUsers | undefined => {
    const usersData = state.users.data;

    if (usersData) {
        const index = usersData.findIndex((user) => user._id === userId);

        if (index !== -1) {
            return usersData[index];
        }
    }

    return undefined;
};
