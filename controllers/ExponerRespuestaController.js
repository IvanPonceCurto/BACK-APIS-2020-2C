const { request } = require("express");
var serviceExponerEncuesta=require("../services/ExponerRespuestasService")

_this=this; //--> Para que wea servira

exports.getEncuesta= async function(req,res,next){
    var idEncuesta=req.headers.idencuesta
    //console.log(JSON.stringify(req.headers))
    try{    
            console.log(idEncuesta)
            var encuesta=await serviceExponerEncuesta.devolverRespuestasEncuesta();
            console.log(encuesta)
            return res.status(200).json(encuesta)
    
    }catch(e){
       return res.status()  
    }
}