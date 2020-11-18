const { static } = require('express')

var moongose=require('mongoose')
var mongoosePaginacion=require('mongoose-paginate')

var EncuestaSchema= new moongose.Schema({
    //Aca creo el schema que va a tener la coleccion.
    idEncuesta: Object,
    tituloEncuesta:String,
    estadoEncuesta:String,
    descripcion:String,
    created:Date,
    modified:Date,
    preguntas:{
        total:Number,
        questions:[{
            questionIndex:Number,
            questionTitle:String,
            questionType:String,
            description:String,
            value:String,
            mandatory:Boolean,
            multiline:Boolean,
            adornment:String,
            restrictions:{min:Number,max:Number},
            options:[{option:String}]
        }]
        
    },
    timestamp:Date

},{collection:'encuestas'})

EncuestaSchema.plugin(mongoosePaginacion)

const Encuesta= moongose.model('Encuesta',EncuestaSchema)

module.exports=Encuesta; //Defino que exporto la encuesta

//Me deberia crear un metodo que itere sobre la totalidad de el resultado del get para que genere un post.