const mongoose = require("mongoose");

const EquipoSchema = new mongoose.Schema({

    idEquipo: {
        type: Number,
        required: true
    }, 
    idClienteAeropuerto: {
        type: Number,
        required: true
    },
    equipo: {
        type: String,
        required: true
    },
    noEconomico: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    noSerie: {
        type: String,
        required: true
    },
    tipoCombustible: {
        type: String,
        required: true
    },
    enUso: {
        type: Boolean,
        required: true,
        default: false
    },
    motivo: {
        type: String,
        require: false
    },
    idTipoEquipo: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
  },
);

const Equipo = mongoose.model("Equipo", EquipoSchema);

module.exports =  Equipo ;