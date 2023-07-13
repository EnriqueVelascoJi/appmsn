const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema({

    idCliente: {
        type: Number,
        required: true
    }, 
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
  },
);

const Cliente = mongoose.model("Cliente", ClienteSchema);

module.exports =  Cliente ;