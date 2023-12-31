
const Prueba = require("../modelos/ModeloPrueba");
const { validarDatos, validarSonido } = require("../helper/validacion");

const multer = require("multer");


// Crear prueba
const crear = async (req, res) => {
    // Recoger los parametros por Post a guardar
    console.log(req.body);
    const { usuario, prueba, descripcion, status } = req.body;
    const quesonido = req.file.filename; // Nombre del archivo de sonido

    console.log(quesonido);

    const parametros = {
        prueba, descripcion
    };
    console.log(parametros);

    // Validar los Datos
    try {
        validarDatos(parametros);

    } catch (error) {
        return res.status(400).json({
            status: "Error",
            mensaje: "Los datos Enviados no son correctos"
        });
    }

    try {
        validarSonido(req.file);

    } catch(error) {
        return res.status(400).json({
            status: "Error",
            //id
            mensaje: "Error en formato de Archivo",
        });
    }

    // Crear el objeto a guardar y asignar valores
    const newPrueba = new Prueba({
        usuario,
        prueba,
        quesonido,
        descripcion,
        status,
    });

    console.log(newPrueba);
    // Guardar el registro en Base de datos
    await newPrueba.save()
        .then((pruebaGuardada) => {
            if (!pruebaGuardada) {
                // Devolver Error
                return res.status(400).json({
                    status: "Error",
                    mensaje: "No se ha podido guardar la Prueba"
                });
            }
            else {
                // Devolver resultado con prueba Guardada
                return res.status(200).json({
                    status: "OK",
                    mensaje: "Accion de Crear Usuario Correcta",
                    pruebaGuardada
                });
            }
        })
        .catch(err => {
            // Devolver Error
            return res.status(400).json({
                status: err,
                mensaje: "Error en Guardar Prueba. No se ha podido guardar."
            });
        });
}

// Listar Pruebas por Usuario o Todas
const listar = async (req, res) => {

    // Recoger los parametros por Post a guardar
    let parametro_url = req.params.usuario;

    let filtro = {};
    if (parametro_url) {
        console.log("Existe Filtro");
        filtro.usuario = parametro_url;
    }
    let consulta = Prueba.find(filtro);
    consulta.sort({ titulo: 1 })
        .exec()
        .then((pruebas) => {

            if (!pruebas) {
                return res.status(404).json({
                    status: "Error",
                    mensaje: "No se han encontrado pruebas"
                });
            } else {
                // Devolver resultado con prueba Guardada
                return res.status(200).json({
                    status: "OK",
                    parametro_url,
                    contador: pruebas.length,
                    pruebas
                });
            }
        })
        .catch(error => {

            return res.status(400).json({
                status: error,
                mensaje: "Error en la llamada al listado"
            });


        });
}

// Listar Pruebas por Usuario o Todas
const editar = async (req, res) => {

    // Recoger los parametros por Post a guardar
    let id = req.params.id;

    // Recoger datos del Body
    let parametros = req.body;

    // Validar los Datos
    try {
        validarDatos(parametros);

    } catch (error) {
        return res.status(400).json({
            status: "Error",
            mensaje: "Los datos Enviados no son correctos"
        });
    }

    // Buscar en la BBDD y actualizar
    let consulta = Prueba.findOneAndUpdate({ _id: id }, parametros, { new: true })
        .exec()
        .then((pruebas) => {

            if (!pruebas) {
                return res.status(404).json({
                    status: "Error",
                    mensaje: "No se han encontrado la prueba para Editar"
                });
            } else {
                // Devolver resultado con prueba Guardada
                return res.status(200).json({
                    status: "OK",
                    id,
                    mensaje: "Prueba Editada",
                    pruebas
                });
            }
        })
        .catch(error => {
            return res.status(400).json({
                status: error,
                mensaje: "Error en la llamada a la Edicion"
            });

        });
}

// Borrar Prueba o todas
const borrar = async (req, res) => {

    // Recoger los parametros por Post a guardar
    let id = req.params.id;

    // Buscar el registro y Borrar
    let consulta = Prueba.findOneAndDelete({ _id: id })
        .exec()
        .then((pruebas) => {
            if (!pruebas) {
                return res.status(404).json({
                    status: "Error",
                    mensaje: "No se han encontrado la pruebas para Borrar"
                });
            } else {
                // Devolver resultado con prueba Guardada
                return res.status(200).json({
                    status: "OK",
                    id,
                    mensaje: "Prueba Borrada",
                    pruebas
                });
            }
        })
        .catch(error => {
            return res.status(400).json({
                status: error,
                mensaje: "Error en la llamada al listado"
            });
        });
}

const subir = async (req, res) => {

    // configurar multer

    // Recoger el archivo y validar formato
    
    //console.log(req.file);

    try {
        validarSonido(req.file);
        console.log("OK formato archivo");
        return res.status(200).json({
            status: "OK",
            file: req.file,
            //id
            mensaje: "subir sonido",
        });
    } catch(error) {
        return res.status(400).json({
            status: "Error",
            //id
            mensaje: "Error en formato de Archivo",
        });
    }



}

module.exports = {
    crear,
    listar,
    editar,
    borrar,
    subir

}