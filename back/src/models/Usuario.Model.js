const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({

    idUsuario: {
        type: Number,
        required: true 
    },
    idCliente: {
        type: Number,
        required: true
    }, 
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tipoUsuario: {
        type: String,
        required: true
    },
    aprobador: {
        type: Boolean,
        required: true,
        default: false
    },
    verificadorWA: {
        type: Boolean,
        required: true,
        default: false
    }
  },
);

const Usuario = mongoose.model("Usuario", UsuarioSchema);

module.exports =  Usuario ;