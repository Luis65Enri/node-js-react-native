const { Router } = require('express');
const controlador_marca = require('../controladores/controlador_marcas');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controlador_marca.inicio);
rutas.post('/guardar',
body('nombre_marca').notEmpty().withMessage("Ingrese un valor en el nombre"),controlador_marca.guardar);
rutas.get('/listar',controlador_marca.listar);
rutas.put('/editar',query("id").isInt().withMessage("El id debe ser un numero entero"),controlador_marca.editar);
rutas.delete('/eliminar',query("id").isInt().withMessage("El id debe ser un numero entero"),controlador_marca.eliminar);
rutas.get('/buscar',
query("id").optional().isInt().withMessage("El id debe ser un numero entero"),
query("marca").optional().notEmpty().withMessage("No se permiten valores vacios"),
controlador_marca.busqueda);
rutas.get('/buscar=id',query("id").isInt().withMessage("El id debe ser un numero entero"),controlador_marca.busqueda_id);
rutas.get('/buscar=nombre',query("nombre").notEmpty().withMessage("Ingrese un valor en el nombre"),controlador_marca.busqueda_nombre);

module.exports = rutas;