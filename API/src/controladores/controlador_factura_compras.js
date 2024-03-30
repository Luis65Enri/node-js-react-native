const { Model } = require('sequelize');
const modelo_factura_compra = require('../modelos/modelo_factura_compra');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.Inicio = (req, res)=>{
    const objeto={
        titulo: 'Rutas de facturas de compra'
    }
    res.json(objeto);
}
exports.Listar = async(req,res)=>{
    const listafacturaC = await modelo_factura_compra.findAll();
    res.json(listafacturaC);
}
exports.Guardar = async(req,res) =>{
    const datos = req.body;
    const {fecha_compra,total_compra}
    = req.body;
    await modelo_factura_compra.create({
        fecha_compra: fecha_compra,
        total_compra: total_compra
    }).then((data)=>{
        res.json(data);
    }).catch((er)=>{
        res.json(er);
    });
}
exports.Editar = async(req,res) =>{
    const datos = req.body;
    const {id}  = req.query;
    const {fecha_compra,total_compra}
    = req.body;
    try{
        var buscarFacturaC = await modelo_factura_compra.findOne({where:{id: id}});
        console.log(buscarFacturaC);
        if(!buscarFacturaC){
            res.json({msj:"El id del cliente no existe"});
        }else{
            buscarFacturaC.fecha_compra= fecha_compra;
            buscarFacturaC.total_compra= total_compra;
            await buscarFacturaC.save()
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
        var buscarFacturaC = await modelo_factura_compra.findOne({where:{id: id}});
        console.log(buscarFacturaC);
        if(!buscarFacturaC){
            res.json({msj:"El id del cliente no existe"});
        }else{
            await modelo_factura_compra.destroyed({where: {id: id}})
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