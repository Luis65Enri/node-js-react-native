const { Router } = require('express');
const controlador_detalle_factura_compra = require('../controladores/controlador_detalle_factura_compras');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controlador_detalle_factura_compra.inicio);
rutas.post('/guardar',
query("cantidad").isInt().withMessage("El campo debe ser un numero entero"),
query("subtotal_linea").isCurrency().withMessage("El campo debe ser un numero decimal"),
query("productoId").isInt().withMessage("El id debe ser un numero entero"),
query("facturaCompraId").isInt().withMessage("El id debe ser un numero entero"),controlador_detalle_factura_compra.guardar);
rutas.get('/listar',controlador_detalle_factura_compra.listar);
rutas.put('/editar',
query("cantidad").isInt().withMessage("El campo debe ser un numero entero"),
query("subtotal_linea").isCurrency().withMessage("El campo debe ser un numero decimal"),
query("productoId").isInt().withMessage("El id debe ser un numero entero"),
query("facturaCompraId").isInt().withMessage("El id debe ser un numero entero"),controlador_detalle_factura_compra.editar);
rutas.delete('/eliminar',query("productoId").isInt().withMessage("El numero de linea debe ser un numero entero"),controlador_detalle_factura_compra.eliminar);
rutas.get('/buscar',
query("productoId").isInt().withMessage("El id debe ser un numero entero"),
query("facturaCompraId").isInt().withMessage("El id debe ser un numero entero"),controlador_detalle_factura_compra.busqueda);
rutas.get('/buscar=id',query("facturaCompraId").isInt().withMessage("El id debe ser un numero entero"),controlador_detalle_factura_compra.busqueda_id);

module.exports = rutas;