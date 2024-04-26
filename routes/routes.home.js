import express from "express";

const homeRouter = express.Router();

// ruta incio home
homeRouter.get("/", (req, res) => {
  res.send("Ruta de inicio");
});

export default homeRouter;
