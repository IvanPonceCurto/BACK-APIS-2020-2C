const LanzamientoEncuesta = require("../models/LanzamientoEncuesta.model")

var lanzamientoEncuesta=require("../models/LanzamientoEncuesta.model").model

_this=this

//Funcionalidades


exports.postEncuestasLanzamiento=async function(encuesta){
    var lanzar=new LanzamientoEncuesta({
        idEncuesta:encuesta.idEncuesta,
        responsable:encuesta.responsable,
        date:Date.now(),
        fechaVencimiento:Date,
        listaEmpresasLanzadas:encuesta.listaEmpresasLanzadas
    })
    try{
        var encuestaTraida= await lanzar.save();
        console.log("Encuesta lanzada correctamente!");
    }catch(e){
        throw new Error("Error al lanzar las encuestas")
    }
}

exports.getEncuestasLanzadas=async function(query,page,limit,idUsuario){
    //Filtro para que solo traiga las que lanzo el usuario del obs.pyme .
    //Nos podria llegar por header.
    var guardarIdUsuario=idUsuario;
    var pagina= page ? page:1
    var limite=limit ? limit:5
    var options={
        pagina,limite,guardarIdUsuario
    }

    try{
        var encuestasLanzadas=await LanzamientoEncuesta.paginate(query,options)
        //VOLVER A VER COMO FUNCIONA EL OPTINOS PARA EL FILTRO.
    }catch(e){
        throw new Error("Error al traernos las encuestas")
    }
}

exports.updateLanzamientosEncuestas=async function(lanzamientoEncuesta){
    var id=lanzamientoEncuesta.idEncuesta;
    try{
        var oldEncuesta=await LanzamientoEncuesta.findById(id)
        if(!oldEncuesta){
            //Sino existe el objeto encuesta ese en cuestion
            return undefined;
        }
        oldEncuesta.listaEmpresasLanzadas=lanzamientoEncuesta.listaEmpresasLanzadas?lanzamientoEncuesta.listaEmpresasLanzadas:oldEncuesta.listaEmpresasLanzadas;
        //Agregar o sacar un empresa
        oldEncuesta.fechaVencimiento=lanzamientoEncuesta.fechaVencimiento?lanzamientoEncuesta.fechaVencimiento:oldEncuesta.fechaVencimiento 
        //actualiza la fecha de vencimiento, PREGUNTAR SI SE PUEDE ACTUALIZAR UN PAR DE DIAS MAS.

        var guardar=await oldEncuesta.save()
        return guardar;
       
        
    }catch(e){
        throw new Error("No se pudo actualizar esa encuesta en especial")
    }
}

exports.agregarEmpresaEncuesta=async function(idEmpresa){
    var id=idEmpresa.idEmpresa
    try{   
        //add
    }catch(e){

    }

}
exports.eliminarEmpresaEncuesta=async function(idEmpresa){
    var id=idEmpresa.idEmpresa
    try{   
        //delete
    }catch(e){

    }

}

exports.deleteLanzamientoEmpresas= async function(encuestasLanzadas){
    try{
        var id=encuestasLanzadas.idEncuesta
        //LanzamientoEncuesta.deleteOne(LanzamientoEncuesta.findById(id));
        var borrar=await LanzamientoEncuesta.remove({
            _id:id
        })
        if(borrar.n===0 && borrar.ok===1){
            throw new Error("La encuesta no pudo ser borrada")
        }
        return 1;
    }catch(e){
        throw new Error("No se pudo borrar la encuesta")
    }
}