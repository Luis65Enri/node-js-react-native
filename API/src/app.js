const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const sincronizarModelos = require('./configuraciones/sincronizar-modelos.js');//modelos creados en documento externo
const app = express();
const PORT = process.env.PORT || 3000;
app.set('port', PORT);
app.use(morgan('common'));
app.use(express.urlencoded({extended:false})); //comando para no encriptar la url//
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST']
}));
app.use('/api/img', express.static(path.join(__dirname, '../public/img/productos')));
app.get('/', (req, res)=>{
    res.send("Hola Mundo");
});
//-----Rutas-----//
app.use('/api/', require('./rutas'));
app.use('/api/rol', require('./rutas/ruta_rol-cuenta'));
app.use('/api/usuario', require('./rutas/ruta_usuario'));
app.use('/api/proveedor', require('./rutas/ruta_proveedores.js'));
app.use('/api/categoria', require('./rutas/ruta_categorias.js'));
app.use('/api/servicio', require('./rutas/ruta_servicios.js'));
app.use('/api/marca', require('./rutas/ruta_marca'));
app.use('/api/producto', require('./rutas/ruta_producto'));
app.use('/api/facturas/venta', require('./rutas/ruta_factura_venta.js'));
app.use('/api/facturas/compra', require('./rutas/ruta_factura_compra.js'));
app.use('/api/facturas/detalle-venta', require('./rutas/ruta_detalle_factura_venta.js'));
app.use('/api/facturas/detalle-compra', require('./rutas/ruta_detalle_factura_compra.js'));
app.use('/inicio',require('./rutas/ruta_login'));
//-----Fin rutas-----//
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto ' + app.get('port'));
});