import { Express } from "express";
import session from "express-session";
import passport from "passport";
import keys from "../config/keys";
import requireLogin from "../middlewares/requireLogin";
import { User } from "../models/User";

export default (app: Express) => {
    app.get("/", (req, res) => {
        if (!req.user) {
            return res.redirect(404, "/login");
        }
    });

    app.get("/api/user/:userId", requireLogin, async (req, res) => {
        try {
            const userId = req.params.userId;

            const user = await User.findById(userId);

            res.status(200).send(user);
        } catch (err: unknown) {
            console.error(err);
            res.status(500).send({ message: "No user found" });
        }
    });

    app.get("/api/users", requireLogin, async (req, res) => {
        try {
            const { match } = req.query;
            const userId = req.user?._id;

            const users = await User.find(
                {
                    username: new RegExp(`^${match}`, "i"),
                    _id: { $ne: userId },
                },
                "username _id"
            );

            if (users.length > 0) {
                res.status(200).send(users);
            } else {
                res.status(404).send({ message: "No users found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Internal Server Error" });
        }
    });

    app.get("/api/auth/current_user", requireLogin, (req, res) => {
        res.send(req.user);
    });

    app.get("/api/auth/logout", (req, res, next) => {
        res.clearCookie("session");
        res.clearCookie("session.sig");

        session({
            secret: keys.cookieKey,
            resave: false,
            saveUninitialized: true,
        })(req, res, () => {
            res.status(200).redirect("/login");
        });
    });

    app.post("/api/auth/sign", passport.authenticate("local"), (req, res) => {
        res.redirect(200, "/");
    });
};
