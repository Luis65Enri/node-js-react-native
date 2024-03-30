const { Router } = require('express');
const rutas = Router();
rutas.get('/', (req, res)=>{
    const objeto={
        titulo: 'API TECHNOLOGY STORE Grupo 1',
        sección: '1601',
        docente: 'Carlos Flores',
        autóres: 'Equipo 1'
    }
    res.json(objeto);
});
module.exports = rutas;