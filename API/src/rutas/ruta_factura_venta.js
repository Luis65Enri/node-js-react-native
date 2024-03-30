const { Router } = require('express');
const controlador_factura_venta = require('../controladores/controlador_factura_ventas');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controlador_factura_venta.inicio);
rutas.post('/guardar',
body('fecha_venta').isDate().withMessage("Solo acepta datos tipo fecha"),
body('total_venta').isCurrency().withMessage("Solo acepta valores en decimal"), controlador_factura_venta.guardar);
rutas.get('/listar',controlador_factura_venta.listar);
rutas.put('/editar',
query("id").isInt().withMessage("El id debe ser un numero entero"),
body('fecha_venta').isDate().withMessage("Solo acepta datos tipo fecha"),
body('total_venta').isCurrency().withMessage("Solo acepta valores en decimal"), controlador_factura_venta.editar);
rutas.delete('/eliminar', controlador_factura_venta.eliminar);
rutas.get('/buscar', controlador_factura_venta.busqueda);
rutas.get('/buscar=id', controlador_factura_venta.busqueda_id);
rutas.get('/buscar=fecha',
query("id").isInt().withMessage("El id debe ser un numero entero"),
query('fecha1').isDate().withMessage("Solo acepta datos tipo fecha"),
query('fecha2').isDate().withMessage("Solo acepta datos tipo fecha"), controlador_factura_venta.busqueda_fecha);
rutas.get('/buscar=precio',
query("id").isInt().withMessage("El id debe ser un numero entero"),
query('precio1').isCurrency().withMessage("Solo acepta valores en decimal"),
query('precio2').isCurrency().withMessage("Solo acepta valores en decimal"), controlador_factura_venta.busqueda_precio);

module.exports = rutas;