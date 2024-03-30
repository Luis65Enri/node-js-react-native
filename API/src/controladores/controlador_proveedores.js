const { Model } = require('sequelize');
const Modeloproveedores = require('../modelos/modelo_proveedor');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.Inicio = (req, res)=>{
    const objeto={
        titulo: 'Rutas de proveedores'
    }
    res.json(objeto);
}
exports.Listar = async(req,res)=>{
    const listaProveedores = await Modeloproveedores.findAll();
    res.json(listaProveedores);
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
exports.Guardar = async(req,res) =>{
    const datos = req.body;
    const {nombre_proveedor,contacto_proveedor,direccion_proveedor,codigo_pais,telefono_proveedor}
    = req.body;
    await Modeloproveedores.create({
        nombre_proveedor: nombre_proveedor,
        contacto_proveedor:contacto_proveedor,
        direccion_proveedor:direccion_proveedor,
        codigo_pais:codigo_pais,
        telefono_proveedor:telefono_proveedor
    }).then((data)=>{
        res.json(data);
    }).catch((er)=>{
        res.json(er);
    });
}
exports.Editar = async(req,res) =>{
    const datos = req.body;
    const {id}  = req.query;
    const {nombre_proveedor,contacto_proveedor,direccion_proveedor,codigo_pais,telefono_proveedor}
    = req.body;
    try{
        var buscarProveedor = await Modeloproveedores.findOne({where:{id: id}});
        console.log(buscarProveedor);
        if(!buscarProveedor){
            res.json({msj:"El id del cliente no existe"});
        }else{
            buscarProveedor.nombre_proveedor = nombre_proveedor;
            buscarProveedor.contacto_proveedor = contacto_proveedor;
            buscarProveedor.direccion_proveedor = direccion_proveedor;
            buscarProveedor.codigo_pais= codigo_pais;
            buscarProveedor.telefono_proveedor= telefono_proveedor;
            await buscarProveedor.save()
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
        const buscarProveedor = await Modeloproveedores.findOne({ where: { id: id } });
        console.log(buscarProveedor);
        if (!buscarProveedor) {
            res.json({ msj: "El id del proveedor no existe" });
        } else {
            await Modeloproveedores.destroy({ where: { id: id } })
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