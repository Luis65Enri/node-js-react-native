const { Model } = require('sequelize');
const modelo = require('../modelos/modelo_proveedor');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.inicio = (req,res)=>{
    const objeto={
        titulo: 'Rutas de proveedores'
    }
    res.json(objeto);
}
exports.guardar = async(req,res)=>{
    const {nombre_proveedor, contacto_proveedor, direccion_proveedor, codigo_pais_telefono_proveedor, telefono_proveedor} = req.body;
    await modelo.create({
        nombre_proveedor: nombre_proveedor,
        contacto_proveedor: contacto_proveedor,
        direccion_proveedor: direccion_proveedor,
        codigo_pais_telefono_proveedor: codigo_pais_telefono_proveedor,
        telefono_proveedor: telefono_proveedor
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
    const datos = req.body;
    const {id}  = req.query;
    const {nombre_proveedor,contacto_proveedor,direccion_proveedor,codigo_pais,telefono_proveedor}
    = req.body;
    try{
        var buscar_proveedor = await modelo.findOne({where:{id: id}});
        console.log(buscar_proveedor);
        if(!buscar_proveedor){
            res.json({msj:"El id no existe"});
        }else{
            buscar_proveedor.nombre_proveedor = nombre_proveedor;
            buscar_proveedor.contacto_proveedor = contacto_proveedor;
            buscar_proveedor.direccion_proveedor = direccion_proveedor;
            buscar_proveedor.codigo_pais= codigo_pais;
            buscar_proveedor.telefono_proveedor= telefono_proveedor;
            await buscar_proveedor.save()
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
            if(req.query.nombre) whereClause.nombre_proveedor = req.query.nombre;
            if(req.query.contacto) whereClause.contacto_proveedor = req.query.contacto;
            if(req.query.telefono) whereClause.telefono_proveedor = req.query.telefono;
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
            const busqueda = await modelo.findAll({where:{ nombre_proveedor:req.query.nombre}});
            res.json(busqueda)
        } catch (error) {
            res.json(error);
        }
    }
}

//antiguos//
exports.busqueda_old = async(req,res) =>{
    const id = req.query.id;
    const nombre = req.query.nombre;
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        var msjerror = validacion.errors.map(error => error.msg).join('. ');
        return res.json({ mensaje: "Hay errores en la petición", error: msjerror });
    }
    try {
        let listaProveedores;
        if (id && !nombre) {
            listaProveedores = await Modeloproveedores.findAll({
                where: { id: id }
            });
        } else if (nombre && !id) {
            listaProveedores= await Modeloproveedores.findAll({
                where: { nombre_proveedor: nombre }
            });
        } else {
            return res.json({ mensaje: "Debes proporcionar solo ID o solo nombre para la búsqueda" });
        }
        res.json(listaProveedores);
    } catch (error) {
        res.json(error);
    }
}