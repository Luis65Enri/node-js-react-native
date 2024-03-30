const { Router } = require('express');
const controlador_categoria = require('../controladores/controlador_categoria');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controlador_categoria.Inicio);
rutas.get('/listar',controlador_categoria.Listar);
rutas.post('/guardar', controlador_categoria.Guardar);
rutas.put('/editar', controlador_categoria.Editar);
rutas.delete('/eliminar', controlador_categoria.Eliminar);

module.exports = rutas;