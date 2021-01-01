const express = require('express');
const router = express.Router();
// const moment = require('node-moment');

const Dato = require('../models/datos');

router.get('/', async (req, res) => {
        const datos = await Dato.find().limit(10);
        res.json(datos);
    });

router.get('/filtrado', async(req, res)=>{
    const { btn_estado, FECHA, PRECIP, EVAP, TMAX, TMIN} = req.body;

});

router.get('/:id', async (req, res) => {
        const dato = await Dato.findById(req.params.id);
        res.json(dato);
    });

router.post('/', async (req, res) => {
    const { id_estacion, FECHA, PRECIP, EVAP, TMAX, TMIN} = req.body;
    const dato = new Dato({ id_estacion, FECHA, PRECIP, EVAP, TMAX, TMIN});
    console.log(dato);
    await dato.save();
    res.json({status: 'Dato guardado'});
});

router.put('/:id', async(req, res) => {
    const { id_estacion, FECHA, PRECIP, EVAP, TMAX, TMIN} = req.body;
    const nuevo_dato = { id_estacion, FECHA, PRECIP, EVAP, TMAX, TMIN};
    await Dato.findByIdAndUpdate(req.params.id, nuevo_dato, {
        useFindAndModify: false
    });
    res.json({status: 'Dato actualizado'});
});

router.delete('/:id', async(req, res) => {

    await Dato.findByIdAndRemove(req.params.id);
    res.json({status: 'Dato Eliminado'});
});




module.exports = router;