const mongoose = require('mongoose');
const { Schema } = mongoose;

const DatosSchema = new Schema({
    id_estacion: {type: Number, require: true},
    FECHA: {type: Date, require: true},
    PRECIP: {type: Number},
    EVAP: {type: Number},
    TMAX: {type: Number},
    TMIN: {type: Number}

})

module.exports = mongoose.model('datos', DatosSchema, 'datos');