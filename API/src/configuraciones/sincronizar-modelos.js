const dbconnect = require('./db-conect.js');
const modelousuarios = require('../modelos/modelo_usuario.js');
const modeloproveedor = require('../modelos/modelo_proveedor.js');
const modelofacturaventas = require('../modelos/modelo_factura_venta');
const modelodetallefacturaventas = require('../modelos/modelo_detalle_factura_venta.js');
const modelofacturacompras = require('../modelos/modelo_factura_compra.js');
const modelodetallefacturacompras = require('../modelos/modelo_detalle_factura_compra.js');
const modelomarcas = require ('../modelos/modelo_marcas.js');
const modeloservicios = require ('../modelos/modelo_servicio.js');
const modelocategorias = require ('../modelos/modelo_categoria.js');
const modeloproductos = require ('../modelos/modelo_producto.js');
const modeloroles = require ('../modelos/modelo_roles.js');

dbconnect.authenticate()
.then(async ()=>{
    modeloroles.hasMany(modelousuarios);
    modelousuarios.belongsTo(modeloroles);
    
    modelocategorias.hasMany(modeloproductos);
    modeloproductos.belongsTo(modelocategorias);
    
    modeloservicios.hasMany(modeloproductos);
    modeloproductos.belongsTo(modeloservicios);
    
    modelomarcas.hasMany(modeloproductos);
    modeloproductos.belongsTo(modelomarcas);
    
    modelousuarios.hasMany(modelofacturaventas);
    modelofacturaventas.belongsTo(modelousuarios);
    
    modeloproveedor.hasMany(modelofacturacompras);
    modelofacturacompras.belongsTo(modeloproveedor);
    
    modelofacturacompras.hasMany(modelodetallefacturacompras);
    modelodetallefacturacompras.belongsTo(modelofacturacompras);
    
    modeloproductos.hasMany(modelodetallefacturacompras);
    modelodetallefacturacompras.belongsTo(modeloproductos);
    
    modeloproductos.hasMany(modelodetallefacturaventas);
    modelodetallefacturaventas.belongsTo(modeloproductos);
    
    modelofacturaventas.hasMany(modelodetallefacturaventas);
    modelodetallefacturaventas.belongsTo(modelofacturaventas);
    
    (async () => {
        try {
            await modeloroles.sync();
            await modelousuarios.sync();
            await modeloproveedor.sync();
            await modelocategorias.sync();
            await modeloservicios.sync();
            await modelomarcas.sync();
            await modeloproductos.sync();
            await modelofacturaventas.sync();
            await modelofacturacompras.sync();
            await modelodetallefacturacompras.sync();
            await modelodetallefacturaventas.sync();
        } catch (error) {
            console.error(error);
        } finally {
            // Cierra la conexión o realiza otras tareas necesarias al finalizar la sincronización
        }
    })();
})
.catch((er)=>{
    console.log(er);
});

module.exports = {
    modelousuarios,
    modeloproveedor,
    modelofacturaventas,
    modelodetallefacturaventas,
    modelofacturacompras,
    modelodetallefacturacompras,
    modelomarcas,
    modeloservicios,
    modelocategorias,
    modeloproductos,
    modeloroles
};

