const { Router } = require('express');
const controlador_proveedor = require('../controladores/controlador_proveedor');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controlador_proveedor.Inicio);
rutas.get('/listar',controlador_proveedor.Listar);
rutas.post('/guardar', controlador_proveedor.Guardar);
rutas.put('/editar', controlador_proveedor.Editar);
rutas.delete('/eliminar', controlador_proveedor.Eliminar);

module.exports = rutas;