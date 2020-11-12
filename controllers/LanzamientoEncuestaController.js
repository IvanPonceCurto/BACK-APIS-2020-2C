const Empresa = require('../models/Empresa.model');
const Encuesta = require('../models/Encuesta.model');
const LanzamientoEncuesta = require('../models/LanzamientoEncuesta.model');
var LanzamientoEncuestaService= require('../services/LanzamientoEncuestaService');
var EncuestaService = require ("../services/Encuesta.Service")

_this = this;

// Async Controller function to get the To do List
exports.getEncuestasLanzadas = async function (req, res, next) {

    
    
    //Nos fijamos si tenemos para la paginacion, sino de igual manera lo controlamos en el serivce.
    try {
        var id=req.headers.idusuario
        var LanzamientoEncuestas = await LanzamientoEncuestaService.getEncuestasLanzadas(id)
        if(LanzamientoEncuestas===null){
            return res.status(404).json({status:404,data:"No hay encuesta lanzadas por este usuario",message:"No se encontraron encuesta"})
        }
        return res.status(200).json({status: 200, data: LanzamientoEncuestas, message: "Encuestas lanzadas al momento"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.postLanzamientoEncuesta = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("ENTREEEE")
    var body= req.body.listaEmpresasLanzadas? req.body.listaEmpresasLanzadas:-1;
    if(body!=-1){
        var LanzamientoEncuesta={
            idUsuario:req.body.idUsuario,
            idEncuesta:req.body.idEncuesta,
            encuesta:await EncuestaService.getEncuestaById(req.body.idEncuesta),
            responsable:req.body.responsable,
            fecha:Date.now(),
            fechaVencimiento: req.body.fechaVencimiento,
            listaEmpresasLanzadas: req.body.listaEmpresasLanzadas
        }
        console.log(LanzamientoEncuesta)
    }
    
    try {
        
        var lanzamientoEncuesta = await LanzamientoEncuestaService.postEncuestasLanzamiento(LanzamientoEncuesta)
        return res.status(201).json({token: lanzamientoEncuesta, message: "Empresa creada correctamente"})
        //Supongo que el token seria como un ResponseEntity<> de Java
    } catch (e) {
        console.log("El error que tiro es: "+e)
        return res.status(400).json({status: 400, message: "No se pudo crear la empresa"})
    }
}

exports.updateLanzamientoEncuesta = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400, message: "Id must be present"})
    }

    var idEncuestaLanzada= req.body._id; 
    var LanzamientoEncuesta = {
        idEncuestaLanzada,
        listaEmpresasNuevas: req.body.listaEmpresasNuevas ? req.body.listaEmpresasNuevas : null,
        listaEmpresasBorrar: req.body.listaEmpresasBorrar? req.body.listaEmpresasBorrar:null 
    }   
    console.log("Lista de empresas nuevas:" +LanzamientoEncuesta.listaEmpresasNuevas)
    console.log("Lista de empresas nuevas:" +LanzamientoEncuesta.listaEmpresasBorrar)
    
    try {
        var flag=req.headers.flag? req.headers.flag:-1
        var updatedLanzamientoEmpresa = await LanzamientoEncuestaService.updateLanzamientosEncuestas(LanzamientoEncuesta,flag)
        return res.status(200).json({status: 200, data: updatedLanzamientoEmpresa, message: "Encuesta actualizada correctamente"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeLanzamiento = async function (req, res, next) {

    //Viene por PathVariable --> Ojaldre con esto
    
    var id=req.headers.id ? req.headers.id : false
    if(id!=false){
        try{
        var deleted = await LanzamientoEncuestaService.deleteLanzamientoEmpresas(id);
        res.status(200).json({status:200,message:"Encuesta borrada con exito!"});
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    }else{
    
        return res.status(400).json({status: 400, message: e.message})
    }
}


