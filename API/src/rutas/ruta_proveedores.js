const { Router } = require("express");
const controlador_proveedor = require("../controladores/controlador_proveedores");
const { body, query } = require("express-validator");
const { Op } = require("sequelize");
const rutas = Router();
rutas.get("/", controlador_proveedor.inicio);
rutas.get("/listar", controlador_proveedor.listar);
rutas.post(
  "/guardar",
  body("nombre_proveedor")
    .notEmpty()
    .withMessage("Ingrese un valor en el nombre"),
  body("contacto_proveedor")
    .notEmpty()
    .withMessage("Ingrese un valor en el contacto"),
  body("direccion_proveedor")
    .notEmpty()
    .withMessage("Ingrese un valor en la direccion"),
  controlador_proveedor.guardar
);
rutas.get("/listar", controlador_proveedor.listar);
rutas.put(
  "/editar",
  [query("id").isInt().withMessage("El id debe ser un numero entero")],
  controlador_proveedor.editar
);
rutas.delete(
  "/eliminar",
  query("id").isInt().withMessage("El id debe ser un numero entero"),
  controlador_proveedor.eliminar
);
rutas.get(
  "/buscar",
  [
    query("nombre")
      .optional()
      .notEmpty()
      .withMessage("No se permiten valores vacios"),
    query("contacto")
      .optional()
      .notEmpty()
      .withMessage("No se permiten valores vacios"),
    query("telefono")
      .optional()
      .notEmpty()
      .withMessage("No se permiten valores vacios"),
  ],
  controlador_proveedor.busqueda
);
rutas.get(
  "/buscar=id",
  query("id").isInt().withMessage("El id debe ser un numero entero"),
  controlador_proveedor.busqueda_id
);
rutas.get(
  "/buscar=nombre",
  query("nombre").notEmpty().withMessage("Ingrese un valor en el nombre"),
  controlador_proveedor.busqueda_nombre
);
module.exports = rutas;
