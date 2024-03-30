const { Router } = require('express');
const controlador_servicio = require('../controladores/controlador_servicio');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controlador_servicio.Inicio);
rutas.get('/listar',controlador_servicio.Listar);
rutas.post('/guardar', controlador_servicio.Guardar);
rutas.put('/editar', controlador_servicio.Editar);
rutas.delete('/eliminar', controlador_servicio.Eliminar);

module.exports = rutas;