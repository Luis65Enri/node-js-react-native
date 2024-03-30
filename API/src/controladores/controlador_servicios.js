const { Model } = require('sequelize');
const modelo = require('../modelos/modelo_servicio');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.inicio = (req,res)=>{
    const objeto={
        titulo: 'Rutas de servicios'
    }
    res.json(objeto);
}
exports.guardar = async(req,res)=>{
    const datos = req.body;
    const {nombre_servicio}
    = req.body;
    await modelo.create({
        nombre_servicio: nombre_servicio,
    }).then((data)=>{
        res.json(data);
    }).catch((er)=>{
        res.json(er);
    });
}
exports.listar = async(req,res)=>{
    const lista = await modelo.findAll();
    res.json(lista);
}
exports.editar = async(req,res)=>{
    const {id}  = req.query;
    const {nombre_servicio}
    = req.body;
    try{
        var servicio = await modelo.findOne({where:{id: id}});
        console.log(servicio);
        if(!servicio){
            res.json({msj:"El id del cliente no existe"});
        }else{
            servicio.nombre_servicio = nombre_servicio;
            await servicio.save()
            .then((data)=>{
                res.json(data);
            }).catch((er)=>{
                res.json(er);
            });
        }
    }catch(error){
        console.log(error);
        res.json({msj:"Error en el servidor"});
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
            const whereClause = {};
            if (req.query.id) whereClause.id = req.query.id;
            if (req.query.nombre) whereClause.nombre_servicio = req.query.nombre;
            const busqueda = await modelo.findAll({ where: { [Op.or]: whereClause } });
            res.json(busqueda);
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