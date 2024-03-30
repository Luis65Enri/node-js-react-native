const sequelize = require('sequelize');
const db = require('../configuraciones/db-conect');

const productos = db.define(
    'productos',
    {
        nombre_producto: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Escriba el nombre del producto'}
            }
        },

        descripcion_producto: {
            type: sequelize.STRING(50),
            allowNull: false,                   
        },

        tipo_producto: {
            type: sequelize.STRING(50),
            allowNull: false,
        },

        precio_producto: {
            type: sequelize.DOUBLE,
            allowNull: false,
        },

        stock_producto: {
            type: sequelize.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'productos',
        timestamps: true

    }
);
module.exports = productos;