const { Router } = require('express');
const controlador_detalle_factura_ventas = require('../controladores/controlador_detalle_factura_ventas');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controlador_detalle_factura_ventas.Inicio);
rutas.get('/listar',controlador_detalle_factura_ventas.Listar);
rutas.post('/guardar', controlador_detalle_factura_ventas.Guardar);
rutas.put('/editar', controlador_detalle_factura_ventas.Editar);
rutas.delete('/eliminar', controlador_detalle_factura_ventas.Eliminar);

module.exports = rutas;