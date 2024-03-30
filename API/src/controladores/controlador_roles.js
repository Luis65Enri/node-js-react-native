const { Model, where } = require ('sequelize');
const modelo = require('../modelos/modelo_roles');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.inicio = (req,res)=>{
    const objeto={
        titulo: 'Rutas de Roles'
    }
    res.json(objeto);
}
exports.guardar = async(req,res)=>{
    const datos = req.body;
    const {tipo_rol, descripcion_rol} = req.body;
    await modelo.create({
        tipo_rol: tipo_rol,
        descripcion_rol: descripcion_rol
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
    const {tipo_rol, descripcion_rol} = req.body;
    try{
        var buscar_rol = await modelo.findOne({where: {id:id}});
        if(!buscar_rol){
            res.json({msj: "El id no existe"});
        }
        else{
            buscar_rol.tipo_rol= tipo_rol;
            buscar_rol.descripcion_rol= descripcion_rol;
        }
        await buscar_rol.save()
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
            if(req.query.tipo) whereClause.tipo_rol = req.query.tipo;
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
