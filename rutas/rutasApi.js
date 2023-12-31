
const express = require("express");
const multer = require("multer");
const controladorPruebas = require("../controladores/controladorPruebas");

const router = express.Router();

const almacenamiento = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'assets/sonidos/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const subidas = multer({storage: almacenamiento});



router.get("/", (req, res)=>{
    console.log("Entando en rutas /api");
    return res.status(200).json({
        status: "OK",
        mensaje:"Inicio de Rutas de api/"
    });
});



// Rutas con Controlador
router.get("/", controladorPruebas.listar);
router.post("/crear", [subidas.single("quesonido")], controladorPruebas.crear);
router.get("/listar/:usuario?", controladorPruebas.listar);
router.put("/editar/:id?", controladorPruebas.editar);
router.delete("/borrar/:id?", controladorPruebas.borrar);
router.post("/subir/:id?", [subidas.single('quesonido')], controladorPruebas.subir);



module.exports = router;