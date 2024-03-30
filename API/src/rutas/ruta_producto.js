const { Router } = require('express');
const controlador_producto = require('../controladores/controlador_productos');
const modelo_producto= require('../modelos/modelo_producto');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.get('/',controlador_producto.inicio);
rutas.post('/guardar',
query("id").isInt().withMessage("El id debe ser un numero entero"),
body('nombre_producto').notEmpty().withMessage("No se permiten valores vacios"),
body('descripcion_producto').notEmpty().withMessage("No se permiten valores vacios"),
body('precio_producto').isCurrency().withMessage("Solo acepta valores decimales"),
body('stock_producto').isInt().withMessage("Solo acepta valores enteros"),
query("categoriaId").isInt().withMessage("El id debe ser un numero entero"),
query("servicioId").isInt().withMessage("El id debe ser un numero entero"),
query("marcaId").isInt().withMessage("El id debe ser un numero entero"),controlador_producto.guardar);
rutas.get('/listar',controlador_producto.listar);
rutas.put('/editar',
query("id").isInt().withMessage("El id debe ser un numero entero"),
body('nombre_producto').notEmpty().withMessage("No se permiten valores vacios"),
body('descripcion_producto').notEmpty().withMessage("No se permiten valores vacios"),
body('tipo_producto').notEmpty().withMessage("No se permiten valores vacios"),
body('precio_producto').isCurrency().withMessage("Solo acepta valores decimales"),
body('stock_producto').isInt().withMessage("Solo acepta valores enteros"),
query("categoriaId").isInt().withMessage("El id debe ser un numero entero"),
query("servicioId").isInt().withMessage("El id debe ser un numero entero"),
query("marcaId").isInt().withMessage("El id debe ser un numero entero"),controlador_producto.editar);
rutas.delete('/eliminar',query("id").isInt().withMessage("El id debe ser un numero entero"),controlador_producto.eliminar);
rutas.get('/buscar',
query("id").isInt().withMessage("El id debe ser un numero entero"),
body('nombre_producto').notEmpty().withMessage("No se permiten valores vacios"),
body('tipo_producto').notEmpty().withMessage("No se permiten valores vacios"),
query("categoriaId").isInt().withMessage("El id debe ser un numero entero"),
query("servicioId").isInt().withMessage("El id debe ser un numero entero"),
query("marcaId").isInt().withMessage("El id debe ser un numero entero"),controlador_producto.busqueda);
rutas.get('/buscar=id',query("id").isInt().withMessage("El id debe ser un numero entero"),controlador_producto.busqueda_id);
rutas.get('/buscar=nombre',query("nombre").notEmpty().withMessage("Ingrese un valor en el nombre"),controlador_producto.busqueda_nombre);
rutas.put('/editarimagen',
query('id').isInt().withMessage('El id debe ser un numero entero')
.custom(async value =>{
    if (!value){
        throw new Error("El id no permite valores nulos");
    }
    else{
        const buscaridProducto=await modelo_producto.findOne({where: {id: value}});
        if(!buscaridProducto){
            throw new Error("El id del producto no existe");
        }
    }
}),
controlador_producto.validarImagen,controlador_producto.actualizarimagenes);

module.exports = rutas;