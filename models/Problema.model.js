var moongose=require('mongoose')
var mongoosePaginacion=require('mongoose-paginate')

var ProblemaSchema= new moongose.Schema({
    //Aca creo el schema que va a tener la coleccion.
    idProblema:Number,
    idEncuesta:Number,
    descripcinoProblema:String

})

ProblemaSchema.plugin(mongoosePaginacion)

const Problema= moongose.model('Problema',ProblemaSchema)

module.exports=Problema; //Defino que exporto la empresa

//Esto podriamos dejarlo para hacerlo como una especie de logs, logs de errores.
