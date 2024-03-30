const { Router } = require('express');
const rutas = Router();
rutas.get('/', (req, res)=>{
    const objeto={
        titulo: 'API TECHNOLOGY STORE Grupo 1',
        sección: '1601',
        docente: 'Carlos Flores',
        autóres: 'Any Martinez, '+'Cesar Dominguez, '+'Luis Argueta, '+'Kevin Coello'
    }
    res.json(objeto);
});
module.exports = rutas;