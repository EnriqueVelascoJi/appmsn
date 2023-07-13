const mongoose = require("mongoose");

const MecanicoSchema = new mongoose.Schema({

    idMecanico: {
        type: Number,
        required: true
    }, 
    nombre: {
        type: String,
        required: true
    }, 
    fechaIngreso: {
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

const Mecanico = mongoose.model("Mecanico", MecanicoSchema);

module.exports =  Mecanico ;