var LanzamientoEncuesta = require("../models/LanzamientoEncuesta.model")
var encuestasBD = require("../models/encuestaBD")

_this=this

//Funcionalidades


exports.postEncuestasLanzamiento=async function(encuesta){
    var lanzar=new LanzamientoEncuesta({
        idUsuario:encuesta.idUsuario,
        idEncuesta:encuesta.idEncuesta,
        encuesta:encuesta.encuesta,
        responsable:encuesta.responsable,
        fecha:encuesta.fecha,
        fechaVencimiento:encuesta.fechaVencimiento,
        listaEmpresasLanzadas:encuesta.listaEmpresasLanzadas
    })
    try{
        var encuestaTraida= await lanzar.save();
        console.log("Encuesta lanzada correctamente!");
        return encuestaTraida;
    }catch(e){
        throw new Error("Error al lanzar las encuestas"+ e)
    }
}

exports.getEncuestasLanzadas=async function(query){
    //Filtro para que solo traiga las que lanzo el usuario del obs.pyme .
    //Nos podria llegar por header.
    var page=1;
    var limit=5;    
    var options={
        page,limit
    }
    try{   
        var encuestasLanzadas=await LanzamientoEncuesta.find({
            idUsuario:query
            //User.service tiene lo del findOne
        });
        return encuestasLanzadas
    }catch(e){
        throw new Error("Error al traernos las encuestas")
    }
}

exports.updateLanzamientosEncuestas=async function(idP,idE,flag){
    var idEmpresa=idE
    var idEncuesta=idP;
    
console.log("DESDE EL SERVICE")
console.log(idEncuesta)
   
    try{
        console.log("El flag que usa es: " +flag)
        var oldEncuesta=await LanzamientoEncuesta.findById(idEncuesta)

        console.log("La encuesta que encontro fue:" ,oldEncuesta)


        if(flag==="2"){
            console.log("Entro al del delete")
            var listaNueva=[]
            for (let i = 0; i < oldEncuesta.listaEmpresasLanzadas.length; i++) {
                    if(oldEncuesta.listaEmpresasLanzadas[i]._id===idEmpresa){
                        oldEncuesta.listaEmpresasLanzadas[i]="";
                        console.log("AHI BORRE")
                    }
                if(oldEncuesta.listaEmpresasLanzadas[i]!=""){
                    listaNueva.push(oldEncuesta.listaEmpresasLanzadas[i]);
                }
                
            }
            
            
            
            oldEncuesta.listaEmpresasLanzadas=listaNueva;
        }
        
        var guardar=await oldEncuesta.save()
        return guardar;
       
        
    }catch(e){
        throw new Error("No se pudo actualizar esa encuesta en especial")
    }
}



exports.deleteLanzamientoEmpresas= async function(idLanzamiento){
    try{
        var deleted = await LanzamientoEncuesta.findByIdAndDelete(idLanzamiento)
        return deleted;
    }catch(e){
        throw new Error("ocurrio un error")
    }
}

exports.insertRespuesta = async function (dataBody)
{
    var newRespuesta = encuestasBD(dataBody);
    try{
        newRespuesta.save()
        return ({message: "Respuesta agregada con éxito",DocumentoAgregado: newRespuesta}) //devuelvo resultado query 
    }
    catch(e){
        throw Error("al insertar una respuesta")
    }
};

exports.getLanzamientoById = async function (id)
{
    try{
        console.log("buscando por",id)
        var results = await LanzamientoEncuesta.findById(id)
        return results
    }catch(e){
        throw Error("al buscar un lanzamiento")
    }
}