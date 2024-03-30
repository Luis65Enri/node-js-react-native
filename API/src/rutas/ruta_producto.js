const { Router } = require('express');
const controlador_producto = require('../controladores/controlador_productos');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controlador_producto.Inicio);
rutas.get('/listar',controlador_producto.Listar);
rutas.post('/guardar', controlador_producto.Guardar);
rutas.put('/editar', controlador_producto.Editar);
rutas.delete('/eliminar', controlador_producto.Eliminar);
rutas.get('/buscar',controlador_producto.Buscar);

module.exports = rutas;