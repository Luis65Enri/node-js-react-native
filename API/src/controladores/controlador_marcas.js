const { Model } = require ('sequelize');
const modelo = require ('../modelos/modelo_marcas');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.inicio = (req, res)=>{ 
    const objeto={
        titulo: 'Rutas de marcas'
    }
    res.json(objeto);
}
exports.guardar = async(req,res)=>{
    const datos = req.body;
    const {nombre_marca} = req.body;
    await modelo.create({
        nombre_marca: nombre_marca,
    }).then((data) => {
        res.json(data);
    }).catch((er)=> {
        res.json(er)
    });
}
exports.listar = async(req,res)=>{
    const lista = await modelo.findAll();
    res.json(lista);
}
exports.editar = async(req,res)=>{
    const {id} = req.query;
    const {nombre_marca} = req.body;
    try{
        var buscar_marca = await modelo.findOne({where: {id:id}});
        if(!buscar_marca){
            res.json({msj: "El id no existe"});

        }
        else{
            buscar_marca.nombre_marca= nombre_marca;
        }
        await buscar_marca.save()
        .then((data) => {
            res.json(data);
        }).catch((er)=> {
            res.json(er)
        });
    }
    catch(error){
        console.log(error);
        res.json({msj: "Error en el servidor"})
    }
}
exports.eliminar = async(req,res)=>{
    const {id} = req.query;
    const validacion = validationResult(req);
    if (validacion.errors.length > 0){
        var msjerror = "";
        validacion.errors.forEach(r => {
            msjerror = msjerror + r.msg + ". ";
        })
        res.json({msj: "Hay errores en la petición", error:msjerror});
    }
    else{
        try {
            var busqueda = await modelo.findOne({ where: { id: id } });
            console.log(busqueda);
            if (!busqueda) {
                res.json({ msj: "El id no existe" });
            } else {
                await modelo.destroy({ where: { id: id } })
                    .then((data) => {
                        res.json({ msj: "Registro eliminado", data: data });
                    })
                    .catch((er) => {
                        res.json(er);
                    });
            }
        } catch (error) {
            res.json(error);
        }
    }
}
//filtros
exports.busqueda = async(req,res)=>{
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerror="";
        validacion.errors.forEach( r => {
            msjerror = msjerror + r.msg + ". ";
        })
        res.json({msj: "Hay errores en la petición", error: msjerror});
    }
    else{
        try{
            const whereClause = {}
            if(req.query.id) whereClause.id = req.query.id;
            if(req.query.marca) whereClause.nombre_marca = req.query.marca;
            const busqueda = await modelo.findAll({ where: { [Op.or]: whereClause } });
            res.json(busqueda)
        }catch (error) {
            res.json(error);
        }
    }
}
exports.busqueda_id = async(req,res)=>{
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerror="";
        validacion.errors.forEach( r => {
            msjerror = msjerror + r.msg + ". ";
        })
        res.json({msj: "Hay errores en la petición", error: msjerror});
    }
    else{
        try{
            const busqueda = await modelo.findOne({where:{ id:req.query.id}});
            res.json(busqueda)
        } catch (error) {
            res.json(error);
        }
    }
}
exports.busqueda_nombre = async(req,res)=>{
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerror="";
        validacion.errors.forEach( r => {
            msjerror = msjerror + r.msg + ". ";
        })
        res.json({msj: "Hay errores en la petición", error: msjerror});
    }
    else{
        try{
            const busqueda = await modelo.findAll({where:{ nombre_marca:req.query.nombre}});
            res.json(busqueda)
        } catch (error) {
            res.json(error);
        }
    }
}

//antiguos
exports.busqueda_old = async (req, res) => {
    const id = req.query.id;
    const nombre = req.query.nombre;
    
    try {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            var msjerror = validacion.errors.map(error => error.msg).join('. ');
            return res.json({ mensaje: "Hay errores en la petición", error: msjerror });
        }

        let listaMarcas;
        if (id && !nombre) {
            listaMarcas = await ModeloMarcas.findAll({
                where: { id: id }
            });
        } else if (nombre && !id) {
            listaMarcas = await ModeloMarcas.findAll({
                where: { nombre_marca: nombre }
            });
        } else {
            return res.json({ mensaje: "Debes proporcionar solo ID o solo nombre para la búsqueda" });
        }
        res.json(listaMarcas);
    } catch (error) {
        res.json(error);
    }
}
