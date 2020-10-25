var test=require("../models/ExponerRespuestas.model")
exports.devolverRespuestasEncuesta= async function (query){
    try{
        var file=await test.devolverJSON();
        //console.log(file)
        return file;
    }catch(e){
        throw new Error("Error al traerse las respuestas de la encuesta",e.message)
    }
}
 




