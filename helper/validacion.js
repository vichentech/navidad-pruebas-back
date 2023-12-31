const validator = require("validator");     //https://www.npmjs.com/package/validator
const fs = require("fs");

const validarDatos = (parametros) => {

    // Validar los Datos
    try {
        let validar_prueba = !validator.isEmpty(parametros.prueba) && validator.isLength(parametros.prueba, { min: 1, max: 40 });
        let validar_descripcion = !validator.isEmpty(parametros.descripcion) && validator.isLength(parametros.descripcion, { min: 5, max: 300 });

        if (!validar_prueba || !validar_descripcion) {
            console.log("Error en longitud de Achivos");
            throw Error("No se ha Validado la informacion enviada!!");
        }
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            mensaje: "Los datos Enviados NO son correctos"
        });
    }
}


const validarSonido = (file) => {

    let sonido = file.originalname;
    let extension = sonido.split(".")[1];
    let ext = extension.toLowerCase();

    //Comprobar extension 
    if (ext != "wma" && ext != "mp3" &&
        ext != "ogg" && ext != "aac" &&
        ext != "wav" && ext != "pcm" &&
        ext != "aiff" && ext != "flac") {

        // Borrar archivo y dar respuesta
        console.log("Error en formato de Archivo");
        console.log("Borramos archivo");
        fs.unlink(file.path, () => {
            throw Error("La extensión del archivo No es Correcta!!");
        });
    }

}

module.exports = {
    validarDatos,
    validarSonido
}
