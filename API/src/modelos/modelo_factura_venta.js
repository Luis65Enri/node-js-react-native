const sequelize = require('sequelize');
const db = require('../configuraciones/db-conect');

const factura_ventas = db.define(
    'factura_ventas',
    {
        fecha_venta:{
            type: sequelize.DATE,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'El campo fecha no puede ir vacio'}
            }
        },
        total_venta:{
            type: sequelize.DOUBLE,
            allowNull: false
        }
    },
    {
        tablename:'factura_ventas',
        timestamps:true
    }
);
module.exports = factura_ventas;