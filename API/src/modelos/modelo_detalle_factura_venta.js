const sequelize = require('sequelize');
const db = require('../configuraciones/db-conect');

const detalle_factura_ventas = db.define(
    'detalle_factura_ventas',
    {
        no_linea:{
            type: sequelize.INTEGER,
            allowNull:false,
            validate: {
                notEmpty: {msg: 'El campo fecha no puede ir vacío'}
            }
        },
        cantidad:{
            type: sequelize.INTEGER,
            allowNull:false,
            validate: {
                notEmpty: {msg: 'El campo cantidad no puede estar vacío'}
            }
        },
        subtotal_linea:{
            type: sequelize.DOUBLE,
            allowNull:false,
            validate: {
                notEmpty: {msg: 'El campo subtotal no puede estar vacío'}
            }
        },
    },
    {
        tablename:'detalle_factura_ventas',
        timestamps:true
    }
);
module.exports = detalle_factura_ventas;