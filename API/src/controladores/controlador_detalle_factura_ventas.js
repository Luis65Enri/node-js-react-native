const { Model } = require('sequelize');
const modelo_detalle_factura_ventas = require('../modelos/modelo_detalle_factura_venta');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.Inicio = (req, res)=>{
    const objeto={
        titulo: 'Rutas detalle factura compra'
    }
    res.json(objeto);
}
exports.Listar = async(req,res)=>{
    const listaDfacturaV = await modelo_detalle_factura_ventas.findAll();
    res.json(listaCategoria);
}
exports.Guardar = async(req,res) =>{
    const datos = req.body;
    const {no_linea,cantidad,subtotal_linea,facturaCompraId,productoId}
    = req.body;
    await modelo_detalle_factura_ventas.create({
        no_linea: no_linea,
        cantidad: cantidad,
        subtotal_linea:subtotal_linea,
        facturaCompraId:facturaCompraId,
        productoId:productoId
    }).then((data)=>{
        res.json(data);
    }).catch((er)=>{
        res.json(er);
    });
}
exports.Editar = async(req,res) =>{
    const datos = req.body;
    const {id}  = req.query;
    const {no_linea,cantidad,subtotal_linea,facturaCompraId,productoId}
    = req.body;
    try{
        var buscarDFacturaV = await modelo_detalle_factura_ventas.findOne({where:{id: id}});
        console.log(buscarDFacturaV);
        if(!buscarDFacturaV){
            res.json({msj:"El id del cliente no existe"});
        }else{
            buscarDFacturaV.no_linea= no_linea;
            buscarDFacturaV.cantidad= cantidad;
            buscarDFacturaV.subtotal_linea= subtotal_linea;
            buscarDFacturaV.facturaCompraId= facturaCompraId;
            buscarDFacturaV.productoId= productoId;
            await buscarDFacturaV.save()
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
    const {nfacturaCompraId}
    = req.body;
    try{
        var buscarDFacturaV = await modelo_detalle_factura_ventas.findOne({where:{id: id}});
        console.log(buscarDFacturaV);
        if(!buscarDFacturaV){
            res.json({msj:"El id del cliente no existe"});
        }else{
            await modelo_detalle_factura_ventas.destroyed({where: {id: id}})
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