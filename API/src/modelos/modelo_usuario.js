const sequelize = require('sequelize');
const db = require('../configuraciones/db-conect');

const usuarios = db.define(
    'usuarios',
    {
        nombre_usuario:{
            type: sequelize.STRING(50),
            allowNull:false,
            validate: {
                notEmpty: {msg: 'El campo nombre no puede ir vacío'}
            }
        },
        apellido_usuario:{
            type: sequelize.STRING(50),
            allowNull:false,
            validate: {
                notEmpty: {msg: 'El campo apellido no puede estar vacío'}
            }
        },
        correo_electronico_usuario:{
            type: sequelize.STRING(250),
            allowNull:true,
        },
        codigo_pais_telefono_usuario:{
            type: sequelize.STRING(5),
            allowNull:true,
        },
        telefono_usuario:{
            type: sequelize.STRING(20),
            allowNull:true,
        },
        genero_usuario:{
            type: sequelize.ENUM('M', 'F'),
            allowNull:false,
            validate: {
                notEmpty: {msg: 'El campo contraseña no puede ir vacío.'}
            }
        },
        contraseña_usuario:{
            type: sequelize.STRING(250),
            allowNull:false,
            validate: {
                notEmpty: {msg: 'El campo genero no puede ir vacío.'}
            }
        },
    },
    {
        tableName: 'usuarios',
        timestamps: true
    },
);

module.exports = usuarios;