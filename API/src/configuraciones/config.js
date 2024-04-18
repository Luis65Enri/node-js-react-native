require('dotenv').config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_NAME = process.env.DB_NAME || 'db_tienda';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Luis12345%';
const DB_PORT = process.env.DB_PORT || 3306;

module.exports = {
    DB_HOST,
    DB_USER,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT
};

