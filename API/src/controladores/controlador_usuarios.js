const { Model } = require('sequelize');
const ModeloUsuario = require('../modelos/modelo_usuario');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const roles = require('../modelos/modelo_roles');

exports.Inicio = (req, res)=>{
    const objeto={
        titulo: 'Rutas de usuarios'
    }
    res.json(objeto);
}
exports.Guardar = async(req, res)=>{
    const {nombre_usuario, apellido_usuario, correo_electronico_usuario, codigo_pais_telefono_usuario, telefono_usuario, genero_usuario, contraseña_usuario,roleId} = req.body;
    await ModeloUsuario.create({
        nombre_usuario: nombre_usuario,
        apellido_usuario: apellido_usuario,
        correo_electronico_usuario: correo_electronico_usuario,
        codigo_pais_telefono_usuario: codigo_pais_telefono_usuario,
        telefono_usuario: telefono_usuario,
        genero_usuario: genero_usuario,
        contraseña_usuario: contraseña_usuario,
        roleId:roleId

    }).then((data)=>{
        res.json(data)
    }).catch((er)=>{
        res.json(er)
    });
}
exports.Buscar = async(req,res)=>{
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
            const listaUsuarios = await ModeloUsuario.findAll({
                where:{
                    [Op.or]:[
                        {nombre_usuario:req.query.filtro},
                        {apellido_usuario:req.query.filtro},
                        {correo_electronico_usuario:req.query.filtro},
                    ]
                }
                
            });
            res.json(listaClientes)
        }catch (error) {
            res.json(error);
        }
    }
}
exports.Listar = async(req,res)=>{
    const listaUsuarios = await ModeloUsuario.findAll();
    res.json(listaUsuarios);
}
exports.BuscarId = async(req,res)=>{
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
            const listaUsuarios = await ModeloUsuario.findAll({where:{ id:req.query.id}});
            res.json(listaUsuarios)
        } catch (error) {
            res.json(error);
        }
    }
}
exports.BuscarNombre = async(req,res)=>{
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
            const listaUsuarios = await ModeloUsuario.findAll({where:{ nombre_usuario:req.query.filtro}});
            res.json(listaUsuarios)
        } catch (error) {
            res.json(error);
        }
    }
}
exports.BuscarApellido = async(req,res)=>{
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
            const listaUsuarios = await ModeloUsuario.findAll({where:{ apellido_usuario:req.query.filtro}});
            res.json(listaClientes)
        } catch (error) {
            res.json(error);
        }
    }
}
exports.Editar =async(req, res)=>{
    const {id}=req.query;
    const {nombre_usuario, apellido_usuario, correo_electronico_usuario, codigo_pais_telefono_usuario, telefono_usuario, genero_usuario, contraseña_usuario,roleId} = req.body;
    try{
        var buscarusuario = await ModeloUsuario.findOne({where: {id:id}});
        console.log(buscarusuario)
    if(!buscarusuario){
        res.json({msj:"El id de usuario no existe"});
    }
    else
    {
        buscarusuario.nombre_usuario=nombre_usuario,
        buscarusuario.apellido_usuario=apellido_usuario,
        buscarusuario.correo_electronico_usuario=correo_electronico_usuario,
        buscarusuario.codigo_pais_telefono_usuario=codigo_pais_telefono_usuario,
        buscarusuario.telefono_usuario=telefono_usuario,
        buscarusuario.genero_usuario=genero_usuario,
        buscarusuario.contraseña_usuario=contraseña_usuario,
        buscarusuario.roleId=roleId
        await buscarusuario.save()
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
exports.Eliminar =async(req, res)=>{
    const {id}=req.query;
    try{
        var buscarusuario = await buscarusuario.findOne({where: {id:id}});
        console.log(buscarusuario)
    if(!buscarusuario){
        res.json({msj:"El id de usuario no existe"});
    }
    else
    {
        await ModeloUsuario.destroy({ where: {id: id}
        }).then((data)=>{
            res.json({msj : "Registro eliminado", data : data});
        }).catch((er)=>{
            res.json(er)
        });;
    }
    }
    catch(error){
        console.log(error);
        res.json({msj:"Error de servidor"})
    }
}