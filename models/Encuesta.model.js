const { static } = require('express')

var moongose=require('mongoose')
var mongoosePaginacion=require('mongoose-paginate')



var EncuestaSchema= new moongose.Schema({
    //Aca creo el schema que va a tener la coleccion.
    idEncuesta: String,
    tituloEncuesta:String,
    estadoEncuesta:String,
    descripcion:String,
    created:Date,
    modified:Date,
    preguntas:{
        
        values:[]
    },
    timestamp:Date

})

EncuestaSchema.plugin(mongoosePaginacion)

const Encuesta= moongose.model('Encuesta',EncuestaSchema)

module.exports=Encuesta; //Defino que exporto la encuesta
