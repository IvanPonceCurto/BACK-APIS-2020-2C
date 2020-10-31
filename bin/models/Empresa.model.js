const { static } = require('express')

var moongose=require('mongoose')
var mongoosePaginacion=require('mongoose-paginate')



var EmpresaSchema= new moongose.Schema({
    //Aca creo el schema que va a tener la coleccion.
    idEmpresa: String,
    nombreEmpresa:String,
    razonSocial:String,
    CUIT:String,
    responsable:[],
    timestamp:Date

})

EmpresaSchema.plugin(mongoosePaginacion)

const Empresa= moongose.model('Empresa',EmpresaSchema)

module.exports=Empresa; //Defino que exporto la empresa


//