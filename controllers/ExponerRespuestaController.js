const { request } = require("express");
var serviceExponerEncuesta=require("../services/ExponerRespuestasService")

_this=this; //--> Para que wea servira

exports.getEncuesta= async function(req,res,next){
    var idEncuesta=req.headers.idencuesta
    var idUsuarioObservatorio=req.headers.idobservatorio
    //console.log(JSON.stringify(req.headers))
    try{    
            console.log(idEncuesta)
            console.log(idUsuarioObservatorio)
            var filters={
                idEncuesta:idEncuesta,
                idUsuarioObservatorio:idUsuarioObservatorio
            }
            var encuesta=await serviceExponerEncuesta.devolverRespuestasEncuesta(filters);
            console.log(encuesta)
            return res.status(200).json(encuesta)
    
    }catch(e){
       return res.status()  
    }
}