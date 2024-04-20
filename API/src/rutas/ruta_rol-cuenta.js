const { Router } = require("express");
const controlador_rol = require("../controladores/controlador_roles");
const { body, query } = require("express-validator");
const { Op } = require("sequelize");
const rutas = Router();
rutas.get("/", controlador_rol.inicio);
rutas.post(
  "/guardar",
  body("tipo_rol").notEmpty().withMessage("Ingrese un valor en el tipo de rol"),
  body("descripcion_rol").notEmpty().withMessage("Ingrese una descripcion"),
  controlador_rol.guardar
);
rutas.get("/listar", controlador_rol.listar);
rutas.put(
  "/editar",
  [query("id").isInt().withMessage("El id debe ser un número entero")],
  controlador_rol.editar
);

rutas.delete(
  "/eliminar",
  [query("id").isInt().withMessage("El id debe ser un numero entero")],
  controlador_rol.eliminar
);
rutas.get(
  "/buscar",
  [
    query("id")
      .optional()
      .isInt()
      .withMessage("El id debe ser un numero entero"),
    query("tipo")
      .optional()
      .notEmpty()
      .withMessage("No se permiten valores vacios"),
  ],
  controlador_rol.busqueda
);
rutas.get(
  "/buscar=id",
  query("id").isInt().withMessage("El id debe ser un numero entero"),
  controlador_rol.busqueda_id
);

module.exports = rutas;
