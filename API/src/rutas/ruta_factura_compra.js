const { Router } = require('express');
const controlador_factura_compra = require('../controladores/controlador_factura_compras');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/', controlador_factura_compra.inicio);
rutas.post('/guardar',
body('fecha_compra').isDate().withMessage("Solo acepta datos tipo fecha"),
body('total_compra').isCurrency().withMessage("Solo acepta valores en decimal"), controlador_factura_compra.guardar);
rutas.get('/listar',controlador_factura_compra.listar);
rutas.put('/editar',
query("id").isInt().withMessage("El id debe ser un numero entero"),
body('fecha_compra').isDate().withMessage("Solo acepta datos tipo fecha"),
body('total_compra').isCurrency().withMessage("Solo acepta valores en decimal"), controlador_factura_compra.editar);
rutas.delete('/eliminar', controlador_factura_compra.eliminar);
rutas.get('/buscar', controlador_factura_compra.busqueda);
rutas.get('/buscar=id', controlador_factura_compra.busqueda_id);
rutas.get('/buscar=fecha',
query("id").isInt().withMessage("El id debe ser un numero entero"),
query('fecha1').isDate().withMessage("Solo acepta datos tipo fecha"),
query('fecha2').isDate().withMessage("Solo acepta datos tipo fecha"), controlador_factura_compra.busqueda_fecha);
rutas.get('/buscar=precio',
query("id").isInt().withMessage("El id debe ser un numero entero"),
query('precio1').isCurrency().withMessage("Solo acepta valores en decimal"),
query('precio2').isCurrency().withMessage("Solo acepta valores en decimal"), controlador_factura_compra.busqueda_precio);

module.exports = rutas;