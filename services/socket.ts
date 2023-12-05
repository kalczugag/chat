import { createServer } from "http";
import { Server, Socket } from "socket.io";

const io = new Server(8800, {});

let activeUsers: any[];

io.on("connection", (socket: Socket) => {});
