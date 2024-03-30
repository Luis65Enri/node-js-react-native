const sequelize = require('sequelize');
const db = require('../configuraciones/db-conect');


const marcas = db.define(
    'marcas',
    {
        nombre_marca: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {msg: 'El campo nombred de la marca no puede ir vacío'}
            }
        },
    },
    {
        tableName: 'marcas',
        timestamps: true
    }
);
module.exports = marcas;