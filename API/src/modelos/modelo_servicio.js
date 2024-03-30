const sequelize = require('sequelize');
const db = require('../configuraciones/db-conect');

const servicio = db.define(
    'servicios',
    {
        nombre_servicio: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {msg: 'El campo nombre del servicio no puede ir vacío'}
            }
        }
    },
    {
        tablename:'servicios',
        timestamps:true
    }
);
module.exports = servicio;