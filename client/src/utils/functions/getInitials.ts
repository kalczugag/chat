export const splitAndExtractInitials = (fullName: string) => {
    const names = fullName.split(" ");

    const firstNameInitial = names[0] ? names[0].charAt(0) : "";

    const lastNameInitial = names[1] ? names[1].charAt(0) : "";

    return firstNameInitial + lastNameInitial;
};
