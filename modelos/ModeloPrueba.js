
const { Schema,  model } = require("mongoose");

const coleccion = "laspruebas";

const PruebaSchema = Schema({
    usuario:{
        type: String,
        required : true
    },
    prueba:{
        type: String,
        required: true
    },
    quesonido:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    status:{
        type: Number,
        default: 0
    }
});

// Exportamos Nombre del esquema, el tipo y la coleccion donde va 
const Prueba = model("Prueba", PruebaSchema);
module.exports = Prueba;

