const { Model } = require('sequelize');
const modelo = require('../modelos/modelo_factura_venta');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.inicio = (req, res)=>{
    const objeto={
        titulo: 'Rutas de facturas de venta'
    }
    res.json(objeto);
}
exports.guardar = async(req,res) =>{
    const datos = req.body;
    const {fecha_venta,total_venta,usuarioId}
    = req.body;
    await modelo.create({
        fecha_venta: fecha_venta,
        total_venta: total_venta,
        usuarioId: usuarioId
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
    const {fecha_venta,total_venta,usuarioId}
    = req.body;
    try{
        var buscar_facturav = await modelo.findOne({where:{id: id}});
        console.log(buscar_facturav);
        if(!buscar_facturav){
            res.json({msj:"El id del cliente no existe"});
        }else{
            buscar_facturav.fecha_venta= fecha_venta;
            buscar_facturav.total_venta= total_venta;
            buscar_facturav.usuarioId= usuarioId;
            await buscar_facturav.save()
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
                    { id: req.query.id },
                    { fecha_venta: req.query.fecha },
                    { total_venta: req.query.total },
                    { usuarioId: req.query.usuarioId },
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
            const busqueda = await modelo.findOne({where:{ id:req.query.id}});
            res.json(busqueda)
        } catch (error) {
            res.json(error);
        }
    }
}
exports.busqueda_fecha = async(req,res)=>{
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerror="";
        validacion.errors.forEach( r => {
            msjerror = msjerror + r.msg + ". ";
        })
        res.json({msj: "Hay errores en la petición", error: msjerror});
    }
    else{
    try {
        let whereClause = {};

        // Añadir la condición para las fechas si están presentes
        if (req.query.fecha1 && req.query.fecha2) {
            whereClause.fecha_venta = {
                [Op.between]: [req.query.fecha1, req.query.fecha2]
            };
        } else if (req.query.fecha) {
            whereClause.fecha_venta = req.query.fecha;
        }

        const busqueda = await modelo.findAll({
            where: whereClause
        });

        res.json(busqueda);
    } catch (error) {
        res.json(error);
    }
}

}
exports.busqueda_precio = async(req,res)=>{
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerror="";
        validacion.errors.forEach( r => {
            msjerror = msjerror + r.msg + ". ";
        })
        res.json({msj: "Hay errores en la petición", error: msjerror});
    }
    else{
        try {
            let whereClause = {};
    
            if (req.query.precio1 && req.query.precio2) {
                whereClause.total_venta = {
                    [Op.between]: [req.query.precio1, req.query.precio2]
                };
            } else if (req.query.total_venta) {
                whereClause.total_venta = req.query.total_venta;
            }
    
            const busqueda = await modelo.findAll({
                where: whereClause
            });
    
            res.json(busqueda);
        } catch (error) {
            res.json(error);
        }
    }
}