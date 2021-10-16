const express = require('express');
const datos = require('../models/datos');
const router = express.Router();
// const moment = require('node-moment');

const Dato = require('../models/datos');
const Estacion = require('../models/estaciones');
const Num_estacion = require('../models/num_estaciones');
const dfd = require("danfojs-node");

router.get('/', async (req, res) => {
        const datos = await Dato.find().limit(10);
        // console.log(datos);
        //una vez
        // var estac = [];
        // const munc = await Estacion.distinct("MUNICIPIO");
        // console.log(munc);
        // for (var i = 0; i < munc.length; i++){
        //     const esta = await Estacion.find({MUNICIPIO : munc[i]});
        //     for (var j = 0; j < esta.length; j++){
        //         estac.push(esta[j].ESTACION);
        //     }
        //     // const dat = {"MUNICIPIO":munc[i], "Estaciones":estac}
        //     const dat = new Num_estacion({"MUNICIPIO":munc[i], "ESTACIONES":estac});
        //     // console.log(dat);
        //     await dat.save();
        //     estac = [];
        // }
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
    // var cont = 0;
    const datos = await Estacion.distinct("MUNICIPIO");
    datos.forEach(element => console.log(
        municipio = {"value":element, "label":element, "isdisabled": false},
        municipios.push(municipio),
        // cont = cont + 1
        ));
    // console.log("Esta es la cantidad de municipios: " + cont);
    res.json(municipios);
});

router.get('/:id', async (req, res) => {
        const dato = await Dato.findById(req.params.id);
        res.json(dato);
    });


router.post('/search_mun', async (req, res) => {
    const mun = [];
    const m_ant = [];
    const unicos = [];
    console.log(req.body.a_es)
    for (var i = 0; i < req.body.a_es.length; i++){
        const datos = await Estacion.find({ESTADO : req.body.a_es[i]});
        datos.forEach(element => console.log(
            m_ant.push(element.MUNICIPIO)
            ));
    }

    m_ant.forEach( (elemento) => {
        if (!unicos.includes(elemento)) {
            unicos.push(elemento);
        }
    });

    unicos.forEach(element => console.log(
        municipio = {"value":element, "label":element, "isdisabled": false},
        mun.push(municipio)
        ));

    console.log("este es mun: " + mun);
    res.json(mun);
});

router.post('/estaciones', async (req, res) => {
    
    console.log(req.body.muni);

    const munic = [];
    for (var i = 0; i < req.body.muni.length; i++){
        const busqueda = await Estacion.find({MUNICIPIO:req.body.muni[i]});
        busqueda.forEach(element => 
        munic.push(element.ESTACION)
        );
        console.log("este es mun:" + munic);
    }
    
    res.json(munic);
});

router.post('/filtroCombinado', async (req, res) => {
    
    console.log(req.body.muni);

    const munic = [];
    // form_com = "";
    for (var i = 0; i < req.body.muni.length; i++){
        // form_com = '"' + req.body.muni[i] + '"';
        // console.log("este es form com" + form_com);
        const busqueda = await Estacion.find({MUNICIPIO:req.body.muni[i]});
        busqueda.forEach(element => 
        munic.push(element.ESTACION)
        );
        // console.log("este es busqueda" + busqueda);
        console.log("este es mun:" + munic);
    }
    
    // // for (var i = 0; i < mun.length; i++){
    //     console.log("este es elemento mun" + mun[1]);
    //     const busqueda2 = await Dato.find({ID_ESTACION:mun[1]});
    //     // console.log("este es req: " +req.body.muni[1]);
    //     // const busqueda2 = await Dato.find({ID_ESTACION:req.body.muni[1]});
    //     console.log("este es busqueda2" + busqueda2);
    // // }
    // // const datos = await Dato.find({MUNICIPIO:"AGUASCALIENTES"});
    // // const datos = await Dato.find({FECHA:ISODate("1970-06-03T06:00:00.000+00:00")});
    // // console.log("estos son datos" + mun);
    
    res.json({status: 'Dato'});
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