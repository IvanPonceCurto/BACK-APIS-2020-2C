const Empresa = require('../models/Empresa.model');
const Encuesta = require('../models/Encuesta.model');
const LanzamientoEncuesta = require('../models/LanzamientoEncuesta.model');
var LanzamientoEncuestaService= require('../services/LanzamientoEncuestaService');
var EncuestaService = require ("../services/Encuesta.Service")
var EmpresaService= require("../services/Empresa.Service");
const cookieParser = require('cookie-parser');
const { Mongoose } = require('mongoose');
const { getRespuestaSingleSinResp } = require('../services/bd-services');

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
        class EmpresaLista{
            constructor(_id,nombreEmpresa){
                this._id=_id;
                this.nombreEmpresa=nombreEmpresa;
            }
        }
        var lista=[]
        var MiddleManObject=JSON.parse(req.body.listaEmpresasLanzadas);
        MiddleManObject.map((element=>{
            var objetoPush=new Object({_id: element._id,idEmpresa: element.idEmpresa, nombreEmpresa: element.nombreEmpresa})
            lista.push(objetoPush)
        }))
     
        
        //var listaEmpresas=await EmpresaService.getEmpresasById(req.body.listaEmpresasLanzadas._id);
        //console.log("Lo que busco fue:" ,listaEmpresas)

        var LanzamientoEncuesta={
            idUsuario:req.body.idUsuario,
            idEncuesta:req.body.idEncuesta,
            nombreLanzamiento:req.body.nombreLanzamiento,
            encuesta:await EncuestaService.getEncuestaById(req.body.idEncuesta),
            responsable:req.body.responsable,
            fecha:Date.now(),
            fechaVencimiento: req.body.fechaVencimiento,
            listaEmpresasLanzadas:  lista//await listaIterar.map(async element=>{EmpresaService.getEmpresasById(element.idEmpresa)})
        }

    
    try {

        var lanzamientoEncuesta = await LanzamientoEncuestaService.postEncuestasLanzamiento(LanzamientoEncuesta)
        var enc = await EncuestaService.getEncuestaById(lanzamientoEncuesta.idEncuesta)

        lanzamientoEncuesta.listaEmpresasLanzadas.map(elem =>{
            console.log(elem.preguntas)
            let auxMand = 0
            enc.preguntas.questions.map(elem =>{
                if(elem.mandatory === true){
                    auxMand++
                }
            })
            var dataBody = {
                idEncuesta: lanzamientoEncuesta.idEncuesta,
                idLanzamiento: (lanzamientoEncuesta._id).toString(),
                nombreLanzamiento: lanzamientoEncuesta.nombreLanzamiento,
                userId: elem.idEmpresa,
                name: enc.tituloEncuesta,
                description: enc.descripcion,
                status: enc.estadoEncuesta,
                created: enc.created,
                modified: lanzamientoEncuesta.fechaVencimiento,
                questions: enc.preguntas,
                total: enc.preguntas.total,
                answered: 0,
                mandatory: auxMand
            }
            LanzamientoEncuestaService.insertRespuesta(dataBody);
        })
        
        return res.status(201).json({token: lanzamientoEncuesta, message: "Encuesta Lanzada correctamente"})
        //Supongo que el token seria como un ResponseEntity<> de Java
    } catch (e) {
        console.log("El error que tiro es: "+e)
        return res.status(400).json({status: 400, message: "No se pudo crear la empresa"})
    }
}





exports.updateLanzamientoEncuesta = async function (req, res, next) {
   
    var idEmpresa = req.body.idEmpresa
    var idEncuesta = req.body.idEncuesta

    console.log("LO QUE LLEGA AL BACK")
    console.log(idEmpresa)
    console.log(idEncuesta)
    
    
    
    try {
        var flag=req.headers.flag? req.headers.flag:-1
        var updatedLanzamientoEmpresa = await LanzamientoEncuestaService.updateLanzamientosEncuestas(idEncuesta,idEmpresa,flag)
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
    
        return res.status(400).json({status: 400, message:"debes pasar el idLanzamiento por header"})
    }
}

exports.getLanzamientoById = async function (req, res)
{
    var idLanzamiento = req.body.id
    try{
        var results = await LanzamientoEncuestaService.getLanzamientoById(idLanzamiento)
        return res.status(200).json(results)
    }catch(e){
        return res.status(400).json({status: 400, message: "error: "+e})
    }
}


