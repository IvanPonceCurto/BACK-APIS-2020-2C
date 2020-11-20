var moongose=require('mongoose')
var mongoosePaginacion=require('mongoose-paginate');
var Encuesta = require("./Encuesta.model")
var Empresa=require("./Empresa.model");
const { collection } = require('./User.model');
//Ver porque tenemos que usar el .model

var LanzamientoEncuestaSchema= new moongose.Schema({
    //Aca creo el schema que va a tener la coleccion.
    idUsuario:String,
    idEncuesta:String,
    encuesta:Object,
    responsable:{},
    fecha:Date, 
    fechaVencimiento:String,
    listaEmpresasLanzadas:[]
    //FIJARSE SI SE PUEDE DEFINIR UN ARRAYLIST<EMPRESAS>
},{collection:'lanzamientoEncuesta'})

LanzamientoEncuestaSchema.plugin(mongoosePaginacion)

const LanzamientoEncuesta= moongose.model('LanzamientoEncuesta',LanzamientoEncuestaSchema)      

module.exports=LanzamientoEncuesta; //Defino que exporto la empresa
