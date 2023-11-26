import bcrypt from "bcrypt";

export default class Auth {
    static hashPassword(password: string) {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt);
    }

    static comparePassword(raw: string, hash: string): boolean {
        return bcrypt.compareSync(raw, hash);
    }
}
