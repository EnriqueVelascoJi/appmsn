const mongoose = require("mongoose");

const ArchivoSchema = new mongoose.Schema({

    idArchivo: {
        type: Number,
        required: true
    }, 
    idIncidencia: {
        type: Number,
        required: true
    }, 
    url: {
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

const Archivo = mongoose.model("Archivo", ArchivoSchema);

module.exports = Archivo;