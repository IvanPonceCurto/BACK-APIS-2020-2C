const Empresa = require('../models/Empresa.model');
const LanzamientoEncuesta = require('../models/LanzamientoEncuesta.model');
var LanzamientoEncuestaService= require('../services/LanzamientoEncuestaService');


_this = this;

// Async Controller function to get the To do List
exports.getEncuestasLanzadas = async function (req, res, next) {

    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    //Nos fijamos si tenemos para la paginacion, sino de igual manera lo controlamos en el serivce.
    try {
        var LanzamientoEncuestas = await LanzamientoEncuestaService.getEncuestasLanzadas({}, page, limit)
        if(!Empresas){
            return res.status(404).json({status:404,data:LanzamientoEncuestas,message:"No se encontraron empresas lanzadas"})
        }
        return res.status(200).json({status: 200, data: Empresas, message: "Encuestas lanzadas al momento"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.postLanzamientoEncuesta = async function (req, res, next) {
    // Req.Body contains the form submit values.
    var body= req.body.listaEmpresasLanzadas? req.body.listaEmpresasLanzadas:-1;
    if(body!=-1){
        var LanzamientoEncuesta={
            idEncuesta:req.body.idEncuesta,
            responsable:req.body.user,
            fecha:req.body.fecha,
            fechaVencimiento: req.body.fechaVencimiento,
            listaEmpresasLanzadas: req.body.listaEmpresasLanzadas
        }
    }
    
    try {
        
        var lanzamientoEncuesta = await LanzamientoEncuestaService.postEncuestasLanzamiento(LanzamientoEncuesta)
        return res.status(201).json({token: lanzamientoEncuesta, message: "Empresa creada correctamente"})
        //Supongo que el token seria como un ResponseEntity<> de Java
    } catch (e) {
        console.log("El error que tiro es:"+e)
        return res.status(400).json({status: 400, message: "No se pudo crear la empresa"})
    }
}

exports.updateEmpresa = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.idEncuesta) {
        return res.status(400).json({status: 400, message: "Id must be present"})
    }

    var idEncuestaLanzada= req.body.idEncuesta; 
    var LanzamientoEncuesta = {
        idEncuestaLanzada,
        listaEmpresasLanzadas: req.body.listaEmpresasLanzadas ? req.body.listaEmpresasLanzadas : null,
        fechaVencimiento: req.body.fechaVencimiento? req.body.fechaVencimiento:null
    }   
    //MODIFICAR PARA QUE HAGA LO DE ADD Y DELETE
    try {
        var updatedLanzamientoEmpresa = await LanzamientoEncuestaService.updateLanzamientosEncuestas(LanzamientoEncuesta)
        return res.status(200).json({status: 200, data: updatedLanzamientoEmpresa, message: "Encuesta traida correctamente"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeLanzamiento = async function (req, res, next) {

    //Viene por PathVariable --> Ojaldre con esto
    var id = req.params.id;
    id=req.params.id ? req.params.id : false
    if(id){
        try{
        var deleted = await LanzamientoEncuestaService.deleteLanzamientoEmpresas(id);
        res.status(200).send("Se borro con efectividad la encuesta");
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    }else{
    
        return res.status(400).json({status: 400, message: e.message})
    }
}


//HACER LO DE ADD Y DELETE
//ROUTES y la url para que nos tome en Postman.
