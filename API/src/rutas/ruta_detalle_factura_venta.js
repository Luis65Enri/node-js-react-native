const { Router } = require('express');
const controlador_detalle_factura_venta = require('../controladores/controlador_detalle_factura_ventas');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controlador_detalle_factura_venta.inicio);
rutas.post('/guardar',
query("cantidad").isInt().withMessage("El campo debe ser un numero entero"),
query("subtotal_linea").isCurrency().withMessage("El campo debe ser un numero decimal"),
query("productoId").isInt().withMessage("El id debe ser un numero entero"),
query("facturaventaId").isInt().withMessage("El id debe ser un numero entero"),controlador_detalle_factura_venta.guardar);
rutas.get('/listar',controlador_detalle_factura_venta.listar);
rutas.put('/editar',
query("cantidad").isInt().withMessage("El campo debe ser un numero entero"),
query("subtotal_linea").isCurrency().withMessage("El campo debe ser un numero decimal"),
query("productoId").isInt().withMessage("El id debe ser un numero entero"),
query("facturaventaId").isInt().withMessage("El id debe ser un numero entero"),controlador_detalle_factura_venta.editar);
rutas.delete('/eliminar',query("productoId").isInt().withMessage("El numero de linea debe ser un numero entero"),controlador_detalle_factura_venta.eliminar);
rutas.get('/buscar',
query("productoId").isInt().withMessage("El id debe ser un numero entero"),
query("facturaventaId").isInt().withMessage("El id debe ser un numero entero"),controlador_detalle_factura_venta.busqueda);
rutas.get('/buscar=id',query("facturaventaId").isInt().withMessage("El id debe ser un numero entero"),controlador_detalle_factura_venta.busqueda_id);

module.exports = rutas;