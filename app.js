import express from "express";
import homeRouter from "./routes/routes.home.js";
import articulosRouter from "./routes/routes.articulos.js";
import cors from "cors";

const app = express();

//middlemare
app.use(cors());
app.use(express.json());
app.use("/home", homeRouter);
app.use("/api/articulos", articulosRouter);

// conexcion Servidor
const puerto = process.env.PUERTO || 4000;

app.listen(puerto, () => {
  console.log(`Server ok,  http://localhost:${puerto}`);
});
