const mongoose = require('mongoose');
const { Schema } = mongoose;

const EstacionesSchema = new Schema({
    ESTACION: {type: Number, require: true},
    NOMBRE: {type: String, require: true},
    ESTADO: {type: String, require: true},
    MUNICIPIO: {type: String, require: true},
    SITUACION: {type: String},
    ORGANISMO: {type: String},
    CVEOMM: {type: String},
    LATITUD: {type: Number},
    LONGITUD: {type: Number},
    ALTITUD: {type: Number},
    EMISION: {type: Date}

})

module.exports = mongoose.model('estaciones', EstacionesSchema, 'estaciones');