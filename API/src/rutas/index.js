const { Router } = require('express');
const controladorInicio = require('../controladores/controlador_Inicio');
const rutas = Router();
rutas.get('/', controladorInicio.Inicio);
rutas.get('/otra', controladorInicio.Otra);
rutas.post('/datos', controladorInicio.Datos);
rutas.put('/datos', controladorInicio.Modificar);
rutas.delete('/datos', controladorInicio.Eliminar);
module.exports = rutas;