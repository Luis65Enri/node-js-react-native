const { Model } = require('sequelize');
const Modelodetallefacturacompra = require('../modelos/modelo_detalle_factura_compra');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.Inicio = (req, res)=>{
    const objeto={
        titulo: 'Rutas detalle factura compra'
    }
    res.json(objeto);
}
exports.Listar = async(req,res)=>{
    const listaDfacturaC = await Modelodetallefacturacompra.findAll();
    res.json(listaCategoria);
}
exports.Guardar = async(req,res) =>{
    const datos = req.body;
    const {no_linea,cantidad,subtotal_linea,facturaCompraId,productoId}
    = req.body;
    await Modelodetallefacturacompra.create({
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
        var buscarDFacturaC = await Modelodetallefacturacompra.findOne({where:{id: id}});
        console.log(buscarDFacturaC);
        if(!buscarDFacturaC){
            res.json({msj:"El id del cliente no existe"});
        }else{
            buscarDFacturaC.no_linea= no_linea;
            buscarDFacturaC.cantidad= cantidad;
            buscarDFacturaC.subtotal_linea= subtotal_linea;
            buscarDFacturaC.facturaCompraId= facturaCompraId;
            buscarDFacturaC.productoId= productoId;
            await buscarDFacturaC.save()
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
        var buscarDFacturaC = await Modelodetallefacturacompra.findOne({where:{id: id}});
        console.log(buscarDFacturaC);
        if(!buscarDFacturaC){
            res.json({msj:"El id del cliente no existe"});
        }else{
            await Modelodetallefacturacompra.destroyed({where: {id: id}})
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