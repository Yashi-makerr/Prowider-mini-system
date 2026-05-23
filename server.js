const { createServer } = require("http");

const next = require("next");

const { Server } = require("socket.io");

const dev =
  process.env.NODE_ENV !== "production";

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {

  const httpServer =
    createServer((req, res) => {

      handle(req, res);

    });

  const io = new Server(httpServer, {

    cors: {
      origin: "*",
    },
  });

  global.io = io;
  io.on("connection", (socket) => {

    console.log(
      "Socket connected:",
      socket.id
    );

    socket.on("disconnect", () => {

      console.log(
        "Socket disconnected:",
        socket.id
      );

    });
  });

  httpServer.listen(3000, () => {

    console.log(
      "Server running on port 3000"
    );

  });
});