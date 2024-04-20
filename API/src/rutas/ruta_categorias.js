const { Router } = require("express");
const controlador_categorias = require("../controladores/controlador_categorias");
const { body, query } = require("express-validator");
const { Op } = require("sequelize");
const rutas = Router();
rutas.get("/", controlador_categorias.inicio);
rutas.post(
  "/guardar",
  body("nombre_categoria")
    .notEmpty()
    .withMessage("Ingrese un valor en el nombre"),
  controlador_categorias.guardar
);
rutas.get("/listar", controlador_categorias.listar);
rutas.put(
  "/editar",
  query("id").isInt().withMessage("El id debe ser un numero entero"),
  controlador_categorias.editar
);
rutas.delete(
  "/eliminar",
  query("id").isInt().withMessage("El id debe ser un numero entero"),
  controlador_categorias.eliminar
);
rutas.get(
  "/buscar",
  [
    query("id")
      .optional()
      .isInt()
      .withMessage("El id debe ser un numero entero"),
    query("nombre")
      .optional()
      .notEmpty()
      .withMessage("No se permiten valores vacios"),
  ],
  controlador_categorias.busqueda
);
rutas.get(
  "/buscar=id",
  query("id").isInt().withMessage("El id debe ser un numero entero"),
  controlador_categorias.busqueda_id
);

module.exports = rutas;
