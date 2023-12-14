import mongoose, { Schema } from "mongoose";

export interface IUser {
    _id?: string;
    username: string;
    password: string;
    pic?: string;
    isAdmin?: boolean;
}

const userSchema = new Schema<IUser>({
    username: { type: "String", required: true },
    password: { type: "String", required: true },
    pic: { type: "String", required: false },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false,
    },
});

// userSchema.methods.comparePassword = (raw: string, hash: string) => {
//     return bcrypt.compareSync(raw, hash);
// };

// userSchema.methods.hashPassword = (password: string) => {
//     const salt = bcrypt.genSaltSync();
//     return bcrypt.hashSync(password, salt);
// };

export const User = mongoose.model<IUser>("user", userSchema);
