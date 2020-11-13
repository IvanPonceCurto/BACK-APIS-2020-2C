var encuestasAPI = require('../models/encuestasAPI');
var bodyParser = require('body-parser');

exports.getEncuestas = async function ()
{
    try{
        var listaEncuestas = await encuestasAPI.find(function(err, listaEncuestas){
            return listaEncuestas;
        })
        return listaEncuestas;
    }
    catch(e){
        throw Error("cargando las encuestas")
    }
};