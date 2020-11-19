const e = require('express');
var encuestasBD = require('../models/encuestaBD');
var userProfile = require('../models/userProfile.model');
var mongoose = require('mongoose')

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

exports.deleteRespuesta = async function (idEncuesta,idEmpresa,idLanzamiento) {

    // Delete the User
    try {

        var deleted = await encuestasBD.findOneAndDelete({idLanzamiento:idLanzamiento,userId: idEmpresa})
        /*
       console.log("ELIMINAR ESTA")
      console.log(deleted)
        var eliminar = await encuestasBD.remove(deleted._id)
       */
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Respuesta")
    }
}

exports.obtenerRespuesta = async function (idEmpresa,idLanzamiento1) {

    // Delete the User
    try {

        var deleted = await encuestasBD.findOne({idLanzamiento:idLanzamiento1,userId: idEmpresa})
        console.log("ACA ESTA EL DELETED")
        console.log(deleted)
        /*
       console.log("ELIMINAR ESTA")
      console.log(deleted)
        var eliminar = await encuestasBD.remove(deleted._id)
       */
        return deleted;
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

exports.updateRespuesta = async function (idEncuesta,questionIndex,value) 
{   
    try{
        await encuestasBD.findOneAndUpdate({_id: idEncuesta},{$set: {"questions.questions.$[q].value": value}},{arrayFilters: [{"q.questionIndex": questionIndex}]})
        return {message: "Respuesta actualizada con éxito"}
    }catch(e){
        throw Error("al actualizar la respuesta")
    }
}

exports.respondidas = async function (idEncuesta) 
{
    try{
        var res = await encuestasBD.aggregate([{$match: {_id: mongoose.Types.ObjectId(idEncuesta)}},{$project: {_id: 0, "questions.questions.value":1}},{$unwind: "$questions"},{$unwind: "$questions.questions"},
        {$match:{"questions.questions.value": ""}},{$count: "cuenta"}])
        var f = await encuestasBD.findById(idEncuesta)
        let r = f.questions.total - res[0].cuenta
        await encuestasBD.findOneAndUpdate({_id: idEncuesta},{$set:{answered:r}})
        return {message:"todo ok"}
    }catch(e){
        console.log(e)
        throw Error("al actualizar el estado de respondidas")
    }
}
/**/ 

exports.updateEncuesta = async function (idEncuesta)
{
    try{
        await encuestasBD.findOneAndUpdate({_id: idEncuesta},{$set:{status:"completed"}})
        return {message: "Estado de la encuesta actualizado con éxito"}
    }catch(e){
        throw Error("al actualizar el estado de la encuesta")
    }
}

exports.createUser = async function (dataBody)
{   
    var newUser = userProfile(dataBody)
    try{
        newUser.save()
        return ({message:"Perfil Usuario creado con éxito"})
    }catch(e){
        throw Error("al crear el usuario")
    }
}

exports.getUser = async function (userId)
{
    try{
        console.log("buscando user: "+userId)
        var profile = await userProfile.findOne({idEmpresa: userId}, function(err, data){
            return data
        })
        return profile
    }catch(e){
        throw Error("al buscar usuario")
    }

}

exports.updateProfile = async function (idEmpresa, email, numTel, ciudad, zip, hist, mision, vision)
{
    try{
        console.log("actualizando perfil: "+idEmpresa)
        await userProfile.findOneAndUpdate({idEmpresa: idEmpresa},{$set:{email: email, numTel: numTel, ciudad: ciudad, zip: zip, hist: hist, mision: mision, vision: vision}})
        return {message:"Perfil actualizado con éxito"}
    }catch(e){
        console.log(e)
        throw Error("al actualizar el perfil")
    }
}