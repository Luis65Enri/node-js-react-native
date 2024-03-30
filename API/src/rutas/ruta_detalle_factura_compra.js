const { Router } = require('express');
const controlador_detalle_factura_compra = require('../controladores/controlador_detalle_factura_compras');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controlador_detalle_factura_compra.Inicio);
rutas.get('/listar',controlador_detalle_factura_compra.Listar);
rutas.post('/guardar', controlador_detalle_factura_compra.Guardar);
rutas.put('/editar', controlador_detalle_factura_compra.Editar);
rutas.delete('/eliminar', controlador_detalle_factura_compra.Eliminar);

module.exports = rutas;