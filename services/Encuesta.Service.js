// Gettign the Newly created Mongoose Model we just created 
var Encuesta = require('../models/Encuesta.model');

var {v4:uuidv4}=require('uuid')
// Saving the context of this module inside the _the variable
_this = this

const MOCKEATRES=[ 
    {   "tituloEncuesta":"Encuesta de prueba de hoy",
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
        "tituloEncuesta":"Encuesta trimestral 1231236",
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
},{   "tituloEncuesta":"Encuesta trimestral 3463465",
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

exports.getUltimasEncuestas= async function (req,listaEncuestas){
    //Me traigo todas las encueastas hasta ese momento.
    const url="aca iria la url de el servicio que expondrian"
    try{
        var encuestas= await fetch(url)
        var returnEncuestas= await encuestas.json()
        if(returnEncuestas.length===listaEncuestas.length){
            //La lista de encuestas es la misma, no habria necesida de cambiar las listas
            return listaEncuestas;
        }else{
            const control=listaEncuestas.length;
            for (let i = 0; i < returnEncuestas[control].length; i++) {
                //Itera desde el primer elemento que no encuentra de la lista.
                this.createEncuesta(returnEncuestas[control+i])
                listaEncuestas.push(returnEncuestas[control+i]);
                //Agrega la nueva encuesta a la lista.
                
            }
        }
        //LISTA 1:[1,2,3,4,5]
        //LISTA 2:[9,8,7,6,5,4,3,2,1]

        return listaEncuestas
    }catch(e){
        throw new Error(e)
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
        preguntas:encuesta.preguntas
      
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


exports.getEncuestaById=async function(idEncuesta){
    console.log("El id de la encuesta por el que quiere buscar es: " , idEncuesta)
    try{
        var EncuestaDevolver= await Encuesta.findById(idEncuesta)
        console.log(EncuestaDevolver)
        return EncuestaDevolver
    }catch(e){
        throw new Error("Error al traer la encuesta por el id");
    }
}

exports.getPreguntasById=async function(idEncuesta){
    console.log("El id de la encuesta por el que quiere buscar es: " , idEncuesta)
    try{
        var EncuestaDevolver= await Encuesta.findById(idEncuesta)
        console.log(EncuestaDevolver)
        return EncuestaDevolver.preguntas
    }catch(e){
        throw new Error("Error al traer la encuesta por el id");
    }
}