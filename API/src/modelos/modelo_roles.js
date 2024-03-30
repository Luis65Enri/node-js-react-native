const sequelize = require('sequelize');
const db = require('../configuraciones/db-conect');

const roles = db.define(
    'roles',
    {
        tipo_rol: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Debe escribir el tipo de rol'}
            }
        },
        descripcion_rol: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {msg: 'El campo descripcion del rol no puede ir vacío'}
            }
        },
    },
    {
        tableName: 'roles',
        timestamps: true
    }
);

module.exports = roles;