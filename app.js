require('dotenv').config();

const { conexion } = require("./database/conexion");
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const fs = require("fs");
const rutasApi = require("./rutas/rutasApi");

const { listar } = require("./controladores/controladorPruebas");

console.log("Inicializado App Nodejs Navidad");

conexion();

// Crear servidor Node
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar el Coors
app.use(cors());

// convertir body a objeto js
//app.use(express.json());  // Recibir datos con ncontet-type app/json
//app.use(express.urlencoded({extended:true}));   // Decodifica los datos de formulario en Json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Ruta para mostrar el formulario
//  app.get('/', (req, res) => {
//      res.sendFile(__dirname + '/vistas/index.html');
//  });

// Ruta para descargar los archivos de sonido
app.get('/sonidos/:archivo?', (req, res) => {

    //console.log(req.params);
    let nombreArchivo = req.params.archivo;
    console.log(nombreArchivo);
    const archivoExiste = verificarExistenciaArchivo(nombreArchivo);

    if (!nombreArchivo || !archivoExiste) {
        console.log("No se envia archvio a descargar");
        // Implementar logicz para envio de una respuesta...

        res.status(404).json({
            status: "Error",
            mensaje: 'El archivo no existe'
        }); // Respuesta negativa si el archivo no existe
    } else {

        // Se supone que el archvio existe...
        const archivoPath = 'assets/sonidos/' + nombreArchivo; // Reemplaza con la ruta correcta
        console.log("Enviando Archivo", archivoPath);
        const archivoStream = fs.createReadStream(archivoPath);
        res.setHeader('Content-Disposition', 'attachment; filename=' + nombreArchivo);
        //res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Type', 'audio/mpeg');        
        archivoStream.pipe(res);

    }

});

// Crear rutas utiles para la API
app.use("/api", rutasApi);

// Crear Servidor
app.listen(PORT, () => {
    console.log("Escuchando en puerto " + PORT);
});




// Función para verificar la existencia del archivo
function verificarExistenciaArchivo(nombreArchivo) {
    // Implementa tu lógica para verificar si el archivo existe en el servidor
    // Devuelve true si existe, de lo contrario, devuelve false
    // Puedes usar fs.existsSync u otras funciones para verificar

    if (!nombreArchivo) return false;

    const archivoPath = 'assets/sonidos/' + nombreArchivo; // Reemplaza con la ruta al archivo que deseas verificar
    fs.access(archivoPath, fs.constants.F_OK, (err) => {
        if (err) {
            // El archivo no existe, envía una respuesta de error al cliente
            return false;
        }
    });

    return true; // Ejemplo: siempre devuelve true
}



