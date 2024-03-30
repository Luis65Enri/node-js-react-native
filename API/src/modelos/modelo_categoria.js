const sequelize = require('sequelize');
const db = require('../configuraciones/db-conect');

const categorias = db.define(
    'categorias',
    {
        nombre_categoria: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {msg: 'El campo nombre de  la categoria no puede ir vacío'}
            }
        }
    },
    {
        tablename:'categorias',
        timestamps:true
    }
);
module.exports = categorias;