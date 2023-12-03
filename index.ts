import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import passport from "passport";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import keys from "./config/keys";
import "./models/Chat";
import "./models/User";
import "./models/Message";
import "./services/passport";

mongoose.connect(keys.mongoURI!);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey!],
    })
);
app.use(passport.initialize());
app.use(passport.session());

const http = createServer(app);
export const io = new Server(http);
import { SocketServer } from "./services/socket";

io.on("connection", (socket: Socket) => {
    SocketServer(socket);
});

import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";

userRoutes(app);
chatRoutes(app);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build", { maxAge: 86400000 * 30 }));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
http.listen(PORT);
