const mongoose = require('mongoose');
const { Schema } = mongoose;

const Num_estacionesSchema = new Schema({
    MUNICIPIO: {type: String, require: true},
    ESTACIONES: {type: Array},
})

module.exports = mongoose.model('num_estaciones', Num_estacionesSchema, 'num_estaciones');