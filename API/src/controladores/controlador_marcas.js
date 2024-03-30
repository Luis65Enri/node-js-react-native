const { Model } = require ('sequelize');
const ModeloMarcas = require ('../modelos/modelo_marcas');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.Inicio = (req, res)=>{ 
    const objeto={
        titulo: 'Rutas de Marcas'
    }
    res.json(objeto);
}

exports.Listar = async (req, res) => {
    const listaMarcas = await ModeloMarcas.findAll();
    res.json(listaMarcas);
}  

exports.Buscar = async (req, res) => {
    const id = req.query.id;
    const nombre = req.query.nombre;
    
    try {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            var msjerror = validacion.errors.map(error => error.msg).join('. ');
            return res.json({ mensaje: "Hay errores en la petición", error: msjerror });
        }

        let listaMarcas;
        if (id && !nombre) {
            listaMarcas = await ModeloMarcas.findAll({
                where: { id: id }
            });
        } else if (nombre && !id) {
            listaMarcas = await ModeloMarcas.findAll({
                where: { nombre_marca: nombre }
            });
        } else {
            return res.json({ mensaje: "Debes proporcionar solo ID o solo nombre para la búsqueda" });
        }
        res.json(listaMarcas);
    } catch (error) {
        res.json(error);
    }
}

exports.Guardar = async (req, res) =>{
    const datos = req.body;
    const {nombre_marca} = req.body;
    await ModeloMarcas.create({
        nombre_marca: nombre_marca,
    }).then((data) => {     
        res.json(data);
    }).catch((er)=> {        
        res.json(er)
    });
}
exports.Editar = async (req, res) =>{
    const {id} = req.query;
    const {nombre_marca} = req.body;
    try{
        var BuscarMarca = await ModeloMarcas.findOne({where: {id:id}});
        if(!BuscarMarca){
            res.json({msj: "El id de la Marca no existe"});

        }
        else{
            BuscarMarca.nombre_marca= nombre_marca;
        }
        await BuscarMarca.save()
        .then((data) => {
            res.json(data);
        }).catch((er)=> {
            res.json(er)
        });
    }
    catch(error){
        console.log(error);
        res.json({msj: "Error en el servidor"})
    }
}

exports.Eliminar = async (req, res) => {
    const {id} = req.query;
    try{
        var BuscarMarca = await ModeloMarcas.findOne({where: {id:id}});
        console.log(BuscarMarca);
        if(!BuscarMarca){
            res.json({msj: "El id de la Marca no existe"});

        }
        else{
            await ModeloMarcas.destroy({where: {id:id}})
            .then((data) => {
                res.json(data);
            }).catch((er)=> {
                res.json(er)
            });
        }
    }
    catch(error){
        console.log(error);
        res.json({msj: "Error en el servidor"})
    }
};
