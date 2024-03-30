const { Model } = require('sequelize');
const Modeloservicios = require('../modelos/modelo_servicio');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.Inicio = (req, res)=>{
    const objeto={
        titulo: 'Rutas de servicios'
    }
    res.json(objeto);
}

exports.Listar = async(req,res)=>{
    const listaServicios = await Modeloservicios.findAll();
    res.json(listaServicios);
}
exports.Buscar = async(req,res) =>{
    const id = req.query.id;
    const nombre = req.query.nombre;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        var msjerror = validacion.errors.map(error => error.msg).join('. ');
        return res.json({ mensaje: "Hay errores en la petición", error: msjerror });
    }
    try {
        let listaServicios;
        if (id && !nombre) {
            listaServicios = await Modeloservicios.findAll({
                where: { id: id }
            });
        } else if (nombre && !id) {
            listaServicios= await Modeloservicios.findAll({
                where: { nombre_servicio: nombre }
            });
        } else {
            return res.json({ mensaje: "Debes proporcionar solo ID o solo nombre para la búsqueda" });
        }
        res.json(listaServicios);
    } catch (error) {
        res.json(error);
    }
}
exports.Guardar = async(req,res) =>{
    const datos = req.body;
    const {nombre_servicio}
    = req.body;
    await Modeloservicios.create({
        nombre_servicio: nombre_servicio,
    }).then((data)=>{
        res.json(data);
    }).catch((er)=>{
        res.json(er);
    });
}
exports.Editar = async(req,res) =>{
    const datos = req.body;
    const {id}  = req.query;
    const {nombre_servicio}
    = req.body;
    try{
        var buscarServicio = await Modeloservicios.findOne({where:{id: id}});
        console.log(buscarServicio);
        if(!buscarServicio){
            res.json({msj:"El id del cliente no existe"});
        }else{
            buscarServicio.nombre_servicio = nombre_servicio;
            await buscarServicio.save()
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
exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    try {
        const buscarServicio = await Modeloservicios.findOne({ where: { id: id } });
        console.log(buscarServicio);
        if (!buscarServicio) {
            res.json({ msj: "El id del cliente no existe" });
        } else {
            await Modeloservicios.destroy({ where: { id: id } })
                .then((data) => {
                    res.json({ msj: "Registro eliminado", datos: data });
                }).catch((er) => {
                    res.json(er);
                });
        }
    } catch (error) {
        console.log(error);
        res.json({ msj: "Error en el servidor" });
    }
}