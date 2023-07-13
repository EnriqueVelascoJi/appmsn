const mongoose = require("mongoose");

const EquipoRefaccionesSchema = new mongoose.Schema({

    idClienteAeropuerto: {
        type: Number,
        required: true
    }, 
    idCliente: {
        type: Number,
        required: true
    }, 
    idAeropuerto: {
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

const EquipoRefacciones = mongoose.model("EquipoRefacciones", EquipoRefaccionesSchema);

module.exports = { EquipoRefacciones };