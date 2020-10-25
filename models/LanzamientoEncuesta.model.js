var moongose=require('mongoose')
var mongoosePaginacion=require('mongoose-paginate')
var empresa=require('./Empresa.model').model
var user=require("./User.model").model;
//Ver porque tenemos que usar el .model

var LanzamientoEncuestaSchema= new moongose.Schema({
    //Aca creo el schema que va a tener la coleccion.
    idEncuesta:Int16Array,
    responsable:user,
    fecha:Date,
    fechaVencimiento:Date,
    listaEmpresasLanzadas:[]

})

EmpresaSchema.plugin(mongoosePaginacion)

const LanzamientoEncuesta= moongose.model('LanzamientoEncuesta',LanzamientoEncuestaSchema)

module.exports=LanzamientoEncuesta; //Defino que exporto la empresa
