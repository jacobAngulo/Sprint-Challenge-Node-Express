const express = require("express");
const actionsRouter = require("./data/helpers/actionRouter.js");
const projectsRouter = require("./data/helpers/projectRouter");

const server = express();

server.use(express.json());

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send("here");
});

module.exports = server;
