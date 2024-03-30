const { Router } = require('express');
const controlador_marca = require('../controladores/controlador_marcas');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controlador_marca.Inicio);
rutas.get('/listar',controlador_marca.Listar);
rutas.post('/guardar', controlador_marca.Guardar);
rutas.put('/editar', controlador_marca.Editar);
rutas.delete('/eliminar', controlador_marca.Eliminar);
rutas.get('/buscar',controlador_marca.Buscar);

module.exports = rutas;