const { Router } = require('express');
const controlador_factura_venta = require('../controladores/controlador_factura_ventas');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controlador_factura_venta.Inicio);
rutas.get('/listar',controlador_factura_venta.Listar);
rutas.post('/guardar', controlador_factura_venta.Guardar);
rutas.put('/editar', controlador_factura_venta.Editar);
rutas.delete('/eliminar', controlador_factura_venta.Eliminar);

module.exports = rutas;