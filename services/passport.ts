import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User, IUser } from "../models/User";
import authUtils from "../utils/auth";

passport.serializeUser((user: any, done) => {
    const typedUser = user as IUser;
    done(null, typedUser._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err: unknown) => {
            done(err, undefined);
        });
});

passport.use(
    new LocalStrategy(
        { passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const { action } = req.body;

                if (action === "login") {
                    const user = await User.findOne({ username });

                    if (!user) {
                        return done(null, false, {
                            message: "User not found.",
                        });
                    }

                    const isValid = authUtils.comparePassword(
                        password,
                        user?.password
                    );

                    if (isValid) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: "Incorrect password.",
                        });
                    }
                } else if (action === "register") {
                    const pic = req.body.pic;
                    const existingUser = await User.findOne({ username });

                    if (existingUser) {
                        return done(null, false, {
                            message: "User already exists.",
                        });
                    } else {
                        const hashedPwd = authUtils.hashPassword(password);
                        const newUser = new User({
                            username,
                            password: hashedPwd,
                            pic,
                        });

                        await newUser.save();
                        return done(null, newUser);
                    }
                } else {
                    return done(null, false, { message: "Invalid action." });
                }
            } catch (err: unknown) {
                console.error(err);
                return done(err);
            }
        }
    )
);
