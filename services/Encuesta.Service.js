// Gettign the Newly created Mongoose Model we just created 
var Encuesta = require('../models/Encuesta.model');

var {v4:uuidv4}=require('uuid')
// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Empresa List
exports.getEncuestasBDD = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Encuestas = await Encuesta.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Encuestas;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error al traer todas las encuestas registradas en la base!');
    }
}

exports.getEncuestasAPI = async function (url) {
    try {
            let response = await fetch(url);
            let Encuestas = await response.json()
            return Encuestas;
            
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error al traer  las encuestas registradas en la API!');
    }
}

exports.createEncuesta = async function (encuesta) {
    //SACARLE LOS ToString() al UUID para que funcione.
    var codigo=uuidv4();
    var newEncuesta = new Encuesta({
        idEncuesta:codigo,
        tituloEncuesta:encuesta.tituloEncuesta,
        estadoEncuesta:encuesta.estadoEncuesta,
        descripcion:encuesta.descripcion,
        created:encuesta.created,
        modified:encuesta.modified,
        preguntas:{
        total: encuesta.total,
        values: encuesta.values
        }
      
    })
    //Controller --> Service --> DAO (Le pega a la BDD) --> Schema de Mongo
    try {
        // Guardando la empresa 
        var savedEncuesta = await newEncuesta.save();
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error creando la encuesta")
    }
}


exports.getEncuesta = async function (id) {
    
    
    try {
        var Encuesta2 = await Encuesta.findById(id);
        //Estaba puesto Encuesta y se superponian los datos
        return Encuesta2;

    } catch (e) {
        
        throw Error('Error al traer la encuesta registrada en la base!');
    }
}

