const { Model } = require('sequelize');
const Modelocategoria = require('../modelos/modelo_categoria');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.Inicio = (req, res)=>{
    const objeto={
        titulo: 'Rutas de categorias'
    }
    res.json(objeto);
}

exports.Listar = async(req,res)=>{
    const listaCategoria = await Modelocategoria.findAll();
    res.json(listaCategoria);
}
exports.Buscar = async (req, res) => {
    const id = req.query.id;
    const nombre = req.query.nombre;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        var msjerror = validacion.errors.map(error => error.msg).join('. ');
        return res.json({ mensaje: "Hay errores en la petición", error: msjerror });
    }
    try {
        let listaCategoria;
        if (id && !nombre) {
            listaCategoria = await Modelocategoria.findAll({
                where: { id: id }
            });
        } else if (nombre && !id) {
            listaCategoria = await Modelocategoria.findAll({
                where: { nombre_categoria: nombre }
            });
        } else {
            return res.json({ mensaje: "Debes proporcionar solo ID o solo nombre para la búsqueda" });
        }
        res.json(listaCategoria);
    } catch (error) {
        res.json(error);
    }
}

exports.Guardar = async(req,res) =>{
    const datos = req.body;
    const {nombre_Categoria}
    = req.body;
    await Modelocategoria.create({
        nombre_categoria: nombre_Categoria,
    }).then((data)=>{
        res.json(data);
    }).catch((er)=>{
        res.json(er);
    });
}
exports.Editar = async(req,res) =>{
    const datos = req.body;
    const {id}  = req.query;
    const {nombre_Categoria}
    = req.body;
    try{
        var buscarCategoria = await Modelocategoria.findOne({where:{id: id}});
        console.log(buscarCategoria);
        if(!buscarCategoria){
            res.json({msj:"El id del cliente no existe"});
        }else{
            buscarCategoria.nombre_categoria = nombre_Categoria;
            await buscarCategoria.save()
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
        const buscarCategoria = await Modelocategoria.findOne({ where: { id: id } });
        console.log(buscarCategoria);
        if (!buscarCategoria) {
            res.json({ msj: "El id del cliente no existe" });
        } else {
            await Modelocategoria.destroy({ where: { id: id } })
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