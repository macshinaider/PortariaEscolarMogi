// socket.ts
import { Server as Io, Socket } from "socket.io";
import { Server } from "http";

export default function configureSocket(server: Server) {
    const socketIo = new Io(server, {
        cors: {
            origin: "*",
        },
    });

    socketIo.on("connection", (socket: Socket) => {
        console.log("Cliente conectado");
        socket.on("disconnect", () => {
            console.log("Cliente desconectado");
        });        
    });
}
