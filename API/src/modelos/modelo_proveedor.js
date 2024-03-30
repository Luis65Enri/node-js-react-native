const sequelize = require('sequelize');
const db = require('../configuraciones/db-conect');

const proveedores = db.define(
    'proveedores',
    {
        nombre_proveedor:{
            type: sequelize.STRING(50),
            allowNull:false,
            validate: {
                notEmpty: {msg: 'El campo nombre no puede ir vacío'}
            }
        },
        contacto_proveedor:{
            type: sequelize.STRING(50),
            allowNull:false,
            validate: {
                notEmpty: {msg: 'El campo contacto no puede estar vacío'}
            }
        },
        direccion_proveedor:{
            type: sequelize.STRING(250),
            allowNull:false,
            validate: {
                notEmpty: {msg: 'El campo direccion no puede estar vacío'}
            }
        },
        codigo_pais_telefono_proveedor:{
            type: sequelize.STRING(5),
            allowNull:true,
            validate: {
                notEmpty: {msg: 'El campo codigo del pais no puede ir vacío'}
            }
        },
        telefono_proveedor:{
            type: sequelize.STRING(20),
            allowNull:true,
            validate: {
                notEmpty: {msg: 'El campo telefono del proveedor no puede ir vacío'}
            }
        }
    },
    {
        tableName: 'proveedores',
        timestamps: true
    },
);

module.exports = proveedores;