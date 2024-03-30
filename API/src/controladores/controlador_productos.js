const { Model } = require ('sequelize');
const ModeloProductos = require ('../modelos/modelo_producto');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.Inicio = (req, res)=>{ 
    const objeto={
        titulo: 'Rutas de Productos'
    }
    res.json(objeto);
}

exports.Listar = async (req, res) => {
    const listarProductos = await ModeloProductos.findAll();
    res.json(listarProductos);
    
}

exports.Buscar = async (req, res) => {
    const id = req.query.id;
    const nombre = req.query.nombre;
    
    try {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            var msjerror = validacion.errors.map(error => error.msg).join('. ');
            return res.json({ mensaje: "Hay errores en la petición", error: msjerror });
        }

        let listarProductos;
        if (id && !nombre) {
            listarProductos = await ModeloProductos.findAll({
                where: { id: id }
            });
        } else if (nombre && !id) {
            listarProductos = await ModeloProductos.findAll({
                where: { nombre_producto: nombre }
            });
        } else {
            return res.json({ mensaje: "Debes proporcionar solo ID o solo nombre para la búsqueda" });
        }
        res.json(listarProductos);
    } catch (error) {
        res.json(error);
    }
}


exports.Guardar = async (req, res) => {
    const datos = req.body;
    const {nombre_producto, descripcion_producto, tipo_producto, precio_producto, stock_producto, categoriaId, servicioId, marcaId} = req.body;
    await ModeloProductos.create({
        nombre_producto: nombre_producto,
        descripcion_producto: descripcion_producto,
        tipo_producto: tipo_producto,
        precio_producto: precio_producto,
        stock_producto: stock_producto,
        categoriaId: categoriaId,
        servicioId: servicioId,
        marcaId: marcaId
    }).then((data) => {
        res.json(data);
    }).catch((er)=>{
        res.json(er)
    });
}

exports.Editar = async (req, res) => {
    const {id} = req.query;
    const {nombre_producto, descripcion_producto, tipo_producto, precio_producto, stock_producto, categoriaId, servicioId, marcaId} = req.body;
    try{
        var BuscarProducto = await ModeloProductos.findOne({where: {id: id}});
        console.log(BuscarProducto);
        if(!BuscarProducto){
            res.json({msj: "EL nombre del producto no existe"});
        }       
        else{
            BuscarProducto.nombre_producto= nombre_producto;
            BuscarProducto.descripcion_producto= descripcion_producto;
            BuscarProducto.tipo_producto= tipo_producto;
            BuscarProducto.precio_producto= precio_producto;
            BuscarProducto.stock_producto= stock_producto;
            BuscarProducto.categoriaId= categoriaId;
            BuscarProducto.servicioId= servicioId;
            BuscarProducto.marcaId= marcaId;
            await BuscarProducto.save()
                .then((data) =>{
                    res.json(data);
                }).catch((er)=>{
                    res.json(er)
                });
        }
    }
    catch(error){
        console.log(error);
        res.json({msj: "Error en el servidor"});
    }
}

exports.Eliminar = async (req, res) => {
    const {id} = req.query;
    try{
        var BuscarProducto = await ModeloProductos.findOne({where: { id: id}});
        console.log(BuscarProducto);
        if(!BuscarProducto){
            res.json({msj: "El id del producto no existe"});
        }
        else{
            await ModeloProductos.destroy({where: {id: id}})
            .then((data) =>{
                res.json(data);
            }).catch((er)=>{
                res.json(er)
            });
        }
    }
    catch(error){
        console.log(error);
        res.json({msj: "Error en el servidor"})
    }
};