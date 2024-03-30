const { Router } = require('express');
const controladoruser = require('../controladores/controlador_usuarios');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controladoruser.Inicio)
rutas.get('/listar', controladoruser.Listar);
rutas.post('/guardar', controladoruser.Guardar);
rutas.put('/editar', controladoruser.Editar);
rutas.delete('/eliminar', controladoruser.Eliminar);
module.exports = rutas;