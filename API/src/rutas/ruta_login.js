const { Router } = require('express');
const controladorLogin = require('../controladores/controlador_login');
const { body, query } = require('express-validator');
const { Op } = require('sequelize');
const rutas = Router();
rutas.post('/login', controladorLogin.login);
rutas.post('/login-refresh', controladorLogin.refreshToken);
module.exports = rutas;