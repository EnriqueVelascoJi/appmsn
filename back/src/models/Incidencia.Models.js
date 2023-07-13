const mongoose = require("mongoose");

const IncidenciaSchema = new mongoose.Schema({

    idIncidencia: {
        type: Number,
        required: true
    }, 
    idMecanico: {
        type: Number,
        required: true
    },
    estatus: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
        required: false
    },
    isCheckWa: {
        type: Boolean,
        required: true,
        default: false
    },
    fecha: {
        type: Date,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
  },
);

const Incidencia = mongoose.model("Incidencia", IncidenciaSchema);

module.exports =  Incidencia ;