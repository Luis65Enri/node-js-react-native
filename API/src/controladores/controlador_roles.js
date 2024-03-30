const { Model } = require ('sequelize');
const modelo_roles = require ('../modelos/modelo_roles');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.Inicio = (req, res)=>{
    const objeto={
        titulo: 'Rutas de Roles'
    }
    res.json(objeto);
}

exports.Listar = async (req,res) => {
    const listaRoles = await modelo_roles.findAll();
    res.json(listaRoles);
}

exports.Buscar = async (req, res) => {
    const id = req.query.id;
    const tipo = req.query.tipo;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        var msjerror = validacion.errors.map(error => error.msg).join('. ');
        return res.json({ mensaje: "Hay errores en la petición", error: msjerror });
    }
    try {
        let listaRoles;
        if (id && !tipo) {
            listaRoles = await modelo_roles.findAll({
                where: { id: id }
            });
        } else if (tipo && !id) {
            listaRoles = await modelo_roles.findAll({
                where: { tipo_rol: tipo }
            });
        } else {
            return res.json({ mensaje: "Debes proporcionar solo ID o solo nombre para la búsqueda" });
        }
        res.json(listaRoles);
    } catch (error) {
        res.json(error);
    }
}

exports.Guardar = async (req, res) =>{
    const datos = req.body;
    const {tipo_rol, descripcion_rol} = req.body;
    await modelo_roles.create({
        tipo_rol: tipo_rol,
        descripcion_rol: descripcion_rol

    }).then((data) => {
        res.json(data);
    }).catch((er)=> {
        res.json(er)
    });
}
exports.Editar = async (req, res) =>{
    const {id} = req.query;
    const {tipo_rol, descripcion_rol} = req.body;
    try{
        var BuscarRol = await modelo_roles.findOne({where: {id:id}});
        if(!BuscarRol){
            res.json({msj: "El id de la Marca no existe"});
        }
        else{
            BuscarRol.tipo_rol= tipo_rol;
            BuscarRol.descripcion_rol= descripcion_rol;
        }
        await BuscarRol.save()
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

exports.Eliminar = async (req, res) => {
    const {id} = req.query;
    try{
        var BuscarRol = await modelo_roles.findOne({where: {id:id}});
        console.log(BuscarRol);
        if(!BuscarRol){
            res.json({msj: "El id de la Marca no existe"});

        }
        else{
            await modelo_roles.destroy({where: {id:id}})
            .then((data) => {
                res.json(data);
            }).catch((er)=> {
                res.json(er)
            });
        }
    }
    catch(error){
        console.log(error);
        res.json({msj: "Error en el servidor"})
    }
};
