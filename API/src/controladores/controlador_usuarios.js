const { Model } = require('sequelize');
const modelo = require('../modelos/modelo_usuario');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.inicio = (req,res)=>{
    const objeto={
        titulo: 'Rutas de usuarios'
    }
    res.json(objeto);
}
exports.guardar = async(req,res)=>{
    const {nombre_usuario, apellido_usuario, correo_electronico_usuario, codigo_pais_telefono_usuario, telefono_usuario, genero_usuario, contraseña_usuario, roleId} = req.body;
    await modelo.create({
        nombre_usuario: nombre_usuario,
        apellido_usuario: apellido_usuario,
        correo_electronico_usuario: correo_electronico_usuario,
        codigo_pais_telefono_usuario: codigo_pais_telefono_usuario,
        telefono_usuario: telefono_usuario,
        genero_usuario: genero_usuario,
        contraseña_usuario: contraseña_usuario,
        roleId: roleId
    }).then((data)=>{
        res.json(data)
    }).catch((er)=>{
        res.json(er)
    });
}
exports.listar = async(req,res)=>{
    const lista = await modelo.findAll();
    res.json(lista);
}
exports.editar = async(req,res)=>{
    const {id}=req.query;
    const {nombre_usuario, apellido_usuario, correo_electronico_usuario, codigo_pais_telefono_usuario, telefono_usuario, genero_usuario, contraseña_usuario,roleId} = req.body;
    try{
        var buscar_usuario = await modelo.findOne({where: {id:id}});
        console.log(buscar_usuario)
    if(!buscar_usuario){
        res.json({msj:"El id de usuario no existe"});
    }
    else
    {
        buscar_usuario.nombre_usuario=nombre_usuario,
        buscar_usuario.apellido_usuario=apellido_usuario,
        buscar_usuario.correo_electronico_usuario=correo_electronico_usuario,
        buscar_usuario.codigo_pais_telefono_usuario=codigo_pais_telefono_usuario,
        buscar_usuario.telefono_usuario=telefono_usuario,
        buscar_usuario.genero_usuario=genero_usuario,
        buscar_usuario.contraseña_usuario=contraseña_usuario,
        buscar_usuario.roleId=roleId,
        await buscar_usuario.save()
        .then((data)=>{
            res.json(data);
        })
        .catch((er)=>{
            res.json(er);
        })
    }
    }
    catch(error){
        console.log(error);
        res.json({msj:"Error de servidor"})
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
exports.busqueda = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        const errors = validacion.array().map(error => error.msg);
        return res.json({ msj: "Hay errores en la petición", errors });
    }

    try {
        const whereClause = {};
        if (req.query.nombre) whereClause.nombre_usuario = req.query.nombre;
        if (req.query.apellido) whereClause.apellido_usuario = req.query.apellido;
        if (req.query.correo) whereClause.correo_electronico_usuario = req.query.correo;
        if (req.query.telefono) whereClause.telefono_usuario = req.query.telefono;
        if (req.query.genero) whereClause.genero_usuario = req.query.genero;
        const busqueda = await modelo.findAll({ where: { [Op.or]: whereClause } });
        
        res.json(busqueda);
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        res.json({ msj: "Hubo un error en el servidor" });
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
exports.busqueda_correo = async(req,res)=>{
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
            const busqueda = await modelo.findAll({where:{ correo_electronico_usuario:req.query.correo}});
            res.json(busqueda)
        } catch (error) {
            res.json(error);
        }
    }
}