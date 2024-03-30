const { Model } = require('sequelize');
const modelo_factura_venta = require('../modelos/modelo_factura_venta');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.Inicio = (req, res)=>{
    const objeto={
        titulo: 'Rutas de facturas de venta'
    }
    res.json(objeto);
}
exports.Listar = async(req,res)=>{
    const listafacturaV = await modelo_factura_venta.findAll();
    res.json(listafacturaV);
}
exports.Guardar = async(req,res) =>{
    const datos = req.body;
    const {fecha_venta,total_venta}
    = req.body;
    await modelo_factura_venta.create({
        fecha_venta: fecha_venta,
        total_venta: total_venta
    }).then((data)=>{
        res.json(data);
    }).catch((er)=>{
        res.json(er);
    });
}
exports.Editar = async(req,res) =>{
    const datos = req.body;
    const {id}  = req.query;
    const {fecha_venta,total_venta}
    = req.body;
    try{
        var buscarFacturaV = await modelo_factura_venta.findOne({where:{id: id}});
        console.log(buscarFacturaV);
        if(!buscarFacturaV){
            res.json({msj:"El id del cliente no existe"});
        }else{
            buscarFacturaV.fecha_venta= fecha_venta;
            buscarFacturaV.total_venta= total_venta;
            await buscarFacturaV.save()
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
exports.Eliminar = async(req,res) =>{
    var datos = req.body;
    const {id}  = req.query;
    try{
        var buscarFacturaV = await modelo_factura_venta.findOne({where:{id: id}});
        console.log(buscarFacturaV);
        if(!buscarFacturaV){
            res.json({msj:"El id del cliente no existe"});
        }else{
            await modelo_factura_venta.destroyed({where: {id: id}})
            .then((data)=>{
                res.json({msj:"Registro eliminado",datos: data});
            }).catch((er)=>{
                res.json(er);
            });
        }
    }catch(error){
        console.log(error);
        res.json({msj:"Error en el servidor"});
    }
}