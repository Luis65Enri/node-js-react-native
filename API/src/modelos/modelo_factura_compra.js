const sequelize = require('sequelize');
const db = require('../configuraciones/db-conect');

const factura_compras = db.define(
    'factura_compras',
    {
        fecha_compra:{
            type: sequelize.DATE,
            allowNull:false,
            validate: {
                notEmpty: {msg: 'El campo fecha no puede ir vacío'}
            }
        },
        total_compra:{
            type: sequelize.DECIMAL(18, 2),
            allowNull: false,
            validate: {
                notEmpty: {msg: 'El campo apellido no puede estar vacío'}
            }
        },
    },
    {
        tableName: 'factura_compras',
        timestamps: true
    },
);

module.exports = factura_compras;