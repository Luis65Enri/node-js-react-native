const Sequelize = require('sequelize');
const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_PORT } = require('./config.js');

const database = new Sequelize(
    DB_NAME, // Nombre de la base de datos
    DB_USER, // Usuario de la base de datos
    DB_PASSWORD, // Contraseña de la base de datos
    {
        host: DB_HOST, // Host de la base de datos
        dialect: 'mysql',
        port: DB_PORT, // Puerto de la base de datos
        logging: false
    }
);

// Verificar la conexión a la base de datos
database.authenticate()
    .then(() => console.log('Conexión establecida con éxito.'))
    .catch(err => console.error('No se pudo conectar a la base de datos:', err));

module.exports = database;