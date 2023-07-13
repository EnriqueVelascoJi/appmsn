const mongoose = require("mongoose");

const AeropuertoSchema = new mongoose.Schema({

    idAeropuerto: {
        type: Number,
        required: true
    }, 
    nombre: {
        type: String,
        required: true
    }, 
    siglas: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
  },
);

const Aeropuerto = mongoose.model("Aeropuerto", AeropuertoSchema);

module.exports =  Aeropuerto ;