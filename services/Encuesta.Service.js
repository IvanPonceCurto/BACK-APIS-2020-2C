// Gettign the Newly created Mongoose Model we just created 
var Encuesta = require('../models/Encuesta.model');

var {v4:uuidv4}=require('uuid')
// Saving the context of this module inside the _the variable
_this = this

const MOCKEATRES=[ 
    {   "tituloEncuesta":"Encuesta trimestral 5",
        "estadoEncuesta":"activa",
        "descripcion":"Encuesta para saber el desarrollo de las apis este trimeste",
        "created":"2020-12-12",
        "modified":"2020-12-13",
        "preguntas":{
        "total": 12,
        "preguntas": [  {
            "title":"titulo",
            "resultado":"hola"
                }]
        }
    },{   
        "tituloEncuesta":"Encuesta trimestral 6",
        "estadoEncuesta":"activa",
        "descripcion":"Encuesta para saber el desarrollo de las apis este trimeste pero del mock",
        "created":"2020-12-12",
        "modified":"2020-12-13",
        "preguntas":{
        "total": 12,
        "preguntas": [  {
            "title":"titulo",
            "resultado":"hola"
                    }]
    },
},{   "tituloEncuesta":"Encuesta trimestral 5",
"estadoEncuesta":"activa",
"descripcion":"Encuesta para saber el desarrollo de las apis este trimeste",
"created":"2020-12-12",
"modified":"2020-12-13",
"preguntas":{
"total": 12,
"preguntas": [  {
    "title":"titulo",
    "resultado":"hola"
        }]
}
}
]
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
            //let response = await fetch(url);
            //let Encuestas = await response.json()
            
            var listaExitos=fromApiToEncuesta(MOCKEATRES)
            //El await es necesario? con un parse lo podemos hacer
            //Ver si esta bien planteado asi o no, el metodo de fromApiToEncuesta.
            return listaExitos;
            
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error al traer  las encuestas registradas en la API!');
    }
}
const fromApiToEncuesta=(listaEncuestasApi)=>{
    const listaExitos=[]
    try{
        for (let i = 0; i < listaEncuestasApi.length; i++) {
            var EncuestaBDD=this.createEncuesta(listaEncuestasApi[i]);
            if(EncuestaBDD!=null){
                listaExitos[i]=1;
            }else{
                listaExitos[i]=0;
            }
        }
        return listaExitos
    }catch(e){
        throw Error("Error al postear las empresas desde la api a nuestra bdd")
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
        return savedEncuesta
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

