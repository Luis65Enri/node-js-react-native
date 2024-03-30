const { Model } = require('sequelize');
const modelo = require('../modelos/modelo_detalle_factura_compra');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.inicio = (req, res)=>{
    const objeto={
        titulo: 'Rutas de facturas de compra'
    }
    res.json(objeto);
}
exports.guardar = async(req,res) =>{
    const datos = req.body;
    const {cantidad,subtotal_linea,productoId,facturaCompraId}
    = req.body;
    await modelo.create({
        cantidad:cantidad,
        subtotal_linea:subtotal_linea,
        productoId:productoId,
        facturaCompraId:facturaCompraId
    }).then((data)=>{
        res.json(data);
    }).catch((er)=>{
        res.json(er);
    });
}
exports.listar = async(req,res)=>{
    const lista = await modelo.findAll();
    res.json(lista);
}
exports.editar = async(req,res) =>{
    const datos = req.body;
    const {id}  = req.query;
    const {cantidad,subtotal_linea,productoId,facturaCompraId}
    = req.body;
    try{
        var buscar_detallefacturac = await modelo.findOne({where:{id: id}});
        console.log(buscar_facturac);
        if(!buscar_facturac){
            res.json({msj:"El id del cliente no existe"});
        }else{
            buscar_detallefacturac.cantidad= cantidad;
            buscar_detallefacturac.subtotal_linea= subtotal_linea;
            buscar_detallefacturac.productoId= productoId;
            buscar_detallefacturac.facturaCompraId= facturaCompraId;
            await buscar_detallefacturac.save()
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
    const msjerror = validacion.errors.map(r => r.msg).join(". ");
    res.json({ msj: "Hay errores en la petición", error: msjerror });
} else {
    try {
        const busqueda = await modelo.findAll({
            where: {
                [Op.or]: [
                    { productoId: req.query.total },
                    { facturaCompraId: req.query.usuarioId },
                ]
            }
        });
        res.json(busqueda);
    } catch (error) {
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
            const busqueda = await modelo.findOne({where:{ facturaCompraId:req.query.factura}});
            res.json(busqueda)
        } catch (error) {
            res.json(error);
        }
    }
}