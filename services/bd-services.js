const e = require('express');
var encuestasBD = require('../models/encuestaBD');
var LanzamientoEncuesta = require('../models/LanzamientoEncuesta.model')
exports.getRespuestas = async function ()
{
    try{
        var listaRespuestas = await encuestasBD.find(function(err, listaRespuestas){
            return listaRespuestas
        })
        return listaRespuestas
    }
    catch(e){
        throw Error("al cargar las respuestas")
    }
};

exports.getRespuestaSingle = async function(userId)
{
    try{
        console.log(userId);
        var listaRespuestas = await encuestasBD.find(userId,function(err,listaRespuestas)
        {
            console.log(listaRespuestas)
            return listaRespuestas; //devuelvo resultado query   
        })
        return listaRespuestas
    }catch(e){
        throw Error("al cargar las respuestas del user solicitado");
    }
};

exports.deleteRespuesta = async function (idEncuesta,idEmpresa) {

    // Delete the User
    try {

        var deleted = await encuestasBD.find({idEncuesta:idEncuesta,userId: idEmpresa})
       
      
        var eliminar = await encuestasBD.deleteOne(deleted._id)
       
        return eliminar;
    } catch (e) {
        throw Error("Error Occured while Deleting the Respuesta")
    }
}

exports.getRespuestaSingleSinResp = async function(query)
{
    try{
        console.log(query);
        var listaRespuestas = await encuestasBD.find(query,function(err,listaRespuestas)
        {
                return listaRespuestas
            
        })
        return listaRespuestas
    }catch(e){
        throw Error("al cargar las respuestas del user solicitado");
    }
};

exports.getRespuestaById = async function (idEncuesta)
{
    try{
        console.log(idEncuesta);
        var listaRespuestas = await encuestasBD.find(idEncuesta,function(err,listaRespuestas)
        {
            return listaRespuestas; //devuelvo resultado query   
        })
        return listaRespuestas
    }catch(e){
        throw Error("al cargar las respuestas con el ID solicitado")
    }
};

exports.insertRespuesta = async function (dataBody)
{
    var newRespuesta = encuestasBD(dataBody);
    try{
        newRespuesta.save()
        return ({message: "Respuesta agregada con éxito",DocumentoAgregado: newRespuesta}) //devuelvo resultado query 
    }
    catch(e){
        throw Error("al insertar una respuesta")
    }
};

exports.updateRespuesta = async function (query,sectionIndex,questionIndex,value) 
{
    try{
        await encuestasBD.findOneAndUpdate(query,{$set: {"sections.$[s].questions.$[q].value": value}},{arrayFilters: [{"s.sectionIndex": sectionIndex},{"q.questionIndex": questionIndex}]})
        return {message: "Respuesta actualizada con éxito"}
    }catch(e){
        throw Error("al actualizar la respuesta")
    }
}

exports.updateEncuesta = async function (idEncuesta)
{
    try{
        await encuestasBD.findOneAndUpdate(idEncuesta,{$set:{status:"completed"}})
        return {message: "Estado de la encuesta actualizado con éxito"}
    }catch(e){
        throw Error("al actualizar el estado de la encuesta")
    }
}