const express = require('express');
const router = express.Router();
// const moment = require('node-moment');

const Dato = require('../models/datos');
const Estacion = require('../models/estaciones');

router.get('/', async (req, res) => {
        const datos = await Dato.find().limit(10);
        res.json(datos);
    });

router.get('/estados', async(req, res)=>{
    //const { btn_estado, FECHA, PRECIP, EVAP, TMAX, TMIN} = req.body;
    const estados = []
    const datos = await Estacion.distinct("ESTADO");
    datos.forEach(element => console.log(
        estado = {"value":element, "label":element, "isdisabled": false},
        estados.push(estado)
        ));
    res.json(estados);
});

router.get('/municipios', async(req, res)=>{
    //const { btn_estado, FECHA, PRECIP, EVAP, TMAX, TMIN} = req.body;
    const municipios = []
    const datos = await Estacion.distinct("MUNICIPIO");
    datos.forEach(element => console.log(
        municipio = {"value":element, "label":element, "isdisabled": false},
        municipios.push(municipio)
        ));
    res.json(municipios);
});

router.get('/:id', async (req, res) => {
        const dato = await Dato.findById(req.params.id);
        res.json(dato);
    });


router.post('/search_mun', async (req, res) => {
    const mun = [];
    console.log(req.body.a_es)
    for (var i = 0; i < req.body.a_es.length; i++){
        const datos = await Estacion.find({ESTADO : req.body.a_es[i]});
        datos.forEach(element => console.log(
        municipio = {"value":element.MUNICIPIO, "label":element.MUNICIPIO},
        mun.push(municipio)
        ));
    }
    res.json(mun);
});

router.post('/filtroCombinado', async (req, res) => {
    const datos = await Dato.find();
    res.json(datos);
});

// router.post('/', async (req, res) => {
//     const { id_estacion, FECHA, PRECIP, EVAP, TMAX, TMIN} = req.body;
//     const dato = new Dato({ id_estacion, FECHA, PRECIP, EVAP, TMAX, TMIN});
//     console.log(dato);
//     await dato.save();
//     res.json({status: 'Dato guardado'});
// });

// router.put('/:id', async(req, res) => {
//     const { id_estacion, FECHA, PRECIP, EVAP, TMAX, TMIN} = req.body;
//     const nuevo_dato = { id_estacion, FECHA, PRECIP, EVAP, TMAX, TMIN};
//     await Dato.findByIdAndUpdate(req.params.id, nuevo_dato, {
//         useFindAndModify: false
//     });
//     res.json({status: 'Dato actualizado'});
// });

// router.delete('/:id', async(req, res) => {

//     await Dato.findByIdAndRemove(req.params.id);
//     res.json({status: 'Dato Eliminado'});
// });




module.exports = router;