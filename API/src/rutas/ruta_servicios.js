const { Router } = require("express");
const controlador_servicios = require("../controladores/controlador_servicios");
const { body, query } = require("express-validator");
const { Op } = require("sequelize");
const rutas = Router();
rutas.get("/", controlador_servicios.inicio);
rutas.post(
  "/guardar",
  body("nombre_servicio")
    .notEmpty()
    .withMessage("Ingrese un valor en el nombre"),
  controlador_servicios.guardar
);
rutas.get("/listar", controlador_servicios.listar);
rutas.put(
  "/editar",
  query("id").isInt().withMessage("El id debe ser un numero entero"),
  controlador_servicios.editar
);
rutas.delete(
  "/eliminar",
  query("id").isInt().withMessage("El id debe ser un numero entero"),
  controlador_servicios.eliminar
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
  controlador_servicios.busqueda
);
rutas.get(
  "/buscar=id",
  query("id").isInt().withMessage("El id debe ser un numero entero"),
  controlador_servicios.busqueda_id
);
module.exports = rutas;
