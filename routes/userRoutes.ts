import { Express } from "express";
import passport from "passport";
import requireLogin from "../middlewares/requireLogin";

export default (app: Express) => {
    app.get("/api/auth/current_user", requireLogin, (req, res) => {
        res.send(req.user);
    });

    app.get("/api/auth/logout", (req, res, next) => {
        req.logout((err: unknown) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    });

    app.post("/api/auth/sign", passport.authenticate("local"), (req, res) => {
        res.status(200).send("Success");
    });
};
