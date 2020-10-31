var test=require("../models/ExponerRespuestas.model")
exports.devolverRespuestasEncuesta= async function (filters){
    try{
        //En filters nos llegan los filtros para buscar por encuesta y segun el usuario observatorio pyme.
        //aca seria la llamada al get del servicio de fran
        var file=await test.devolverJSON();
        //console.log(file)
        return file;
    }catch(e){
        throw new Error("Error al traerse las respuestas de la encuesta",e.message)
    }
}
 




