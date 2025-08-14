import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export const initSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("message", (data) => {
      console.log("Received:", data);
      io.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};


//const io = getIO();
//io.emit("message", message);