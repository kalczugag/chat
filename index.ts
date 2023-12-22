import express from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import passport from "passport";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import keys from "./config/keys";
import socket from "./services/socket";
import "./models/Chat";
import "./models/User";
import "./models/Message";
import "./services/passport";

mongoose.connect(keys.mongoURI);

const app = express();
const httpServer = createServer(app);

app.use(
    cors({
        origin: "https://chat-08j1.onrender.com",
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());

socket(httpServer);

import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";

userRoutes(app);
chatRoutes(app);

if (process.env.NODE_ENV === "production") {
    const clientBuildPath = path.join(__dirname, "../client/build");

    app.use(
        express.static(clientBuildPath, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    );

    app.get("*", (req, res) => {
        res.sendFile(path.join(clientBuildPath, "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT);
