var moongose=require('mongoose')
var mongoosePaginacion=require('mongoose-paginate');
var empresa=require('./Empresa.model');
var Encuesta = require("./Encuesta.model")
//Ver porque tenemos que usar el .model

var LanzamientoEncuestaSchema= new moongose.Schema({
    //Aca creo el schema que va a tener la coleccion.
    idUsuario:String,
    idEncuesta:String,
    encuesta:Object,
    responsable:{},
    fecha:Date, 
    fechaVencimiento:Date,
    listaEmpresasLanzadas:[]
    //FIJARSE SI SE PUEDE DEFINIR UN ARRAYLIST<EMPRESAS>
})

LanzamientoEncuestaSchema.plugin(mongoosePaginacion)

const LanzamientoEncuesta= moongose.model('LanzamientoEncuesta',LanzamientoEncuestaSchema)      

module.exports=LanzamientoEncuesta; //Defino que exporto la empresa
