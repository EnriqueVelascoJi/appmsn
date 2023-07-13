const mongoose = require("mongoose");

const ClienteAeropuertoSchema = new mongoose.Schema({

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

const ClienteAeropuerto = mongoose.model("ClienteAeropuerto", ClienteAeropuertoSchema);

module.exports = { ClienteAeropuerto };