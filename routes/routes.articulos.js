//import moduleName from "../controllers/Controllers.js";
import express from "express";
import { conexion } from "../database/db.js";
const articulosRouter = express.Router();

//middlemare
articulosRouter.use((req, res, next) => {
  console.log(req.ip);

  next();
});

// mostar todos los articulos GET
articulosRouter.get("/", (req, res) => {
  conexion.query("SELECT * FROM articulos", (error, filas) => {
    if (!error) {
      res.send(filas);
    } else {
      throw error;
    }
  });
});

// mostrar un articulo GET
articulosRouter.get("/:id", (req, res) => {
  conexion.query(
    "SELECT * FROM articulos WHERE id=?",
    [req.params.id],
    (error, fila) => {
      if (fila == "") return res.status(404).send("Id no Existe");

      if (!error) {
        res.status(200).send(fila);
      } else {
        res.status(409).send();
      }
    }
  );
});
// crear articulo POST
articulosRouter.post("/", (req, res) => {
  let data = {
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,
  };
  let sql = "INSERT INTO articulos SET ?";
  conexion.query(sql, data, function (error, results) {
    if (!error) {
      Object.assign(data, { id: results.insertId });
      res.send(data);
    } else {
      throw error;
    }
  });
});
// editar un articulo PUT
articulosRouter.put("/:id", (req, res) => {
  let id = req.params.id;
  let descripcion = req.body.descripcion;
  let precio = req.body.precio;
  let stock = req.body.stock;
  let sql =
    "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ? ";

  conexion.query(
    sql,
    [descripcion, precio, stock, id],
    function (error, results) {
      if (!error) {
        res.send(results);
      } else {
        throw error;
      }
    }
  );
});
// eliminar un articulo DELETE
articulosRouter.delete("/:id", (req, res) => {
  conexion.query(
    "DELETE FROM articulos WHERE id = ?",
    [req.params.id],
    (error, filas) => {
      if (error) {
        throw error;
      } else {
        res.send(filas);
      }
    }
  );
});

export default articulosRouter;
