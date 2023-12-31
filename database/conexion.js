const mongoose = require("mongoose");

const username = process.env.USERNAME; // Reemplaza con tu nombre de usuario
const password = process.env.PASSWORD; // Reemplaza con tu contraseña
const MONGO_DB_HOST = process.env.MONGO_DB_HOST; // Reemplaza con el nombre del host de tu base de datos
const MONGO_DB_PORT = process.env.MONGO_DB_PORT;
const MONGO_DB = process.env.MONGO_DB; // Reemplaza con el nombre de tu base de datos


const mongoURI = `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB}`;
//console.log(MONGO_DB_HOST,MONGO_DB_PORT,MONGO_DB);
const conexion = async() =>{ 

    try{
        //await mongoose.connect("mongodb://127.0.0.1:27017/test");
        await mongoose.connect(mongoURI);

        console.log("Conectado a la Base de Datos ");
    }catch(error){
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos!!");
    }
}

module.exports = {
    conexion
}