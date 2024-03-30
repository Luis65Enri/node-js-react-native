const { Router } = require('express');
const controladorProveedor = require('../controladores/controlador_proveedores');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controladorProveedor.Inicio);
rutas.get('/listar', controladorProveedor.Listar);
rutas.get('/buscar',controladorProveedor.Buscar);
rutas.post('/guardar',controladorProveedor.Guardar);
rutas.put('/editar',controladorProveedor.Editar);
rutas.delete('/eliminar',controladorProveedor.Eliminar)
module.exports = rutas;