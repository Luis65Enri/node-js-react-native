const { Router } = require("express");
const controlador_usuarios = require("../controladores/controlador_usuarios");
const { body, query } = require("express-validator");
const multer = require("multer");
const path = require("path");
const { ValidarAutenticado} = require("../configuraciones/passport");
const fs = require("fs");
const rutas = Router();

const configurarAlmacenamiento = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/img/usuarios'));
  },
  filename: function (req, file, cb) {
    const nombreUnico = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(
      null,
      file.fieldname + "-" + nombreUnico + "-" + file.mimetype.replace("/", ".")
    );
  },
});
const upload = multer({ storage: configurarAlmacenamiento });

rutas.get("/", controlador_usuarios.inicio);
rutas.get("/lista", controlador_usuarios.listar);
rutas.post(
  "/guardar",
  body("nombre_usuario")
    .notEmpty()
    .withMessage("Ingrese un valor en el nombre"),
  body("apellido_usuario")
    .notEmpty()
    .withMessage("Ingrese un valor en el apellido"),
  body("genero_usuario")
    .notEmpty()
    .withMessage("Ingrese un valor en el genero"),
  body("contraseña_usuario").notEmpty().withMessage("ingrese una contraseña"),
  controlador_usuarios.guardar
);
rutas.get("/listar", controlador_usuarios.listar);
rutas.put(
  "/editar",
  query("id").isInt().withMessage("El id debe ser un numero entero"),
  controlador_usuarios.editar
);
rutas.delete(
  "/eliminar",
  query("id").isInt().withMessage("El id debe ser un numero entero"),
  controlador_usuarios.eliminar
);
rutas.get(
  "/buscar",
  query("nombre")
    .optional()
    .notEmpty()
    .withMessage("No se permiten valores vacios"),
  query("apellido")
    .optional()
    .notEmpty()
    .withMessage("No se permiten valores vacios"),
  query("correo")
    .optional()
    .notEmpty()
    .withMessage("No se permiten valores vacios"),
  query("telefono")
    .optional()
    .notEmpty()
    .withMessage("No se permiten valores vacios"),
  query("nombre")
    .optional()
    .notEmpty()
    .withMessage("No se permiten valores vacios"),
  query("genero")
    .optional()
    .notEmpty()
    .withMessage("No se permiten valores vacios"),
  controlador_usuarios.busqueda
);
rutas.get(
  "/buscar=correo",
  query("correo")
    .notEmpty()
    .withMessage("No se permite valores vacíos en la búsqueda"),
  controlador_usuarios.busqueda_correo
);
rutas.get(
  "/buscar=id",
  query("id").isInt().withMessage("El id debe ser un numero entero"),
  controlador_usuarios.busqueda_id
);
rutas.post(
  "/img",
  ValidarAutenticado,
  upload.single("img"),
  controlador_usuarios.GuardarImagen
);
module.exports = rutas;
