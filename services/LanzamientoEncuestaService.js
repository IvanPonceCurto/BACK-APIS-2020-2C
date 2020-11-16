const LanzamientoEncuesta = require("../models/LanzamientoEncuesta.model")

var lanzamientoEncuesta=require("../models/LanzamientoEncuesta.model").model

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

exports.updateLanzamientosEncuestas=async function(lanzamientoEncuesta,flag){
    var id=lanzamientoEncuesta.idEncuestaLanzada;
    var listaEmpresasNuevas=lanzamientoEncuesta.listaEmpresasNuevas;
    var listaEmpresasBorrar=lanzamientoEncuesta.listaEmpresasBorrar;

    console.log(id,"-",listaEmpresasNuevas,"-",listaEmpresasBorrar)

    const miConjuntoDeEmpresas=new Set();

   
    try{
        console.log("El flag que usa es: " +flag)
        var oldEncuesta=await LanzamientoEncuesta.findById(id)

        console.log("La encuesta que encontro fue:" ,oldEncuesta)

        oldEncuesta.listaEmpresasLanzadas.map(element=>{
            miConjuntoDeEmpresas.add(element);
        })


        if(flag==="1"){
            //Agrego las encuestas a la empresa
            console.log("Entro al del add")
            listaEmpresasNuevas.map((element)=>{
                miConjuntoDeEmpresas.add(element)
            })        
            oldEncuesta.listaEmpresasLanzadas=Array.from(miConjuntoDeEmpresas)
        }
        if(flag==="2"){
            console.log("Entro al del delete")
            var listaNueva=[]
            for (let i = 0; i < oldEncuesta.listaEmpresasLanzadas.length; i++) {
                for (let j = 0; j < listaEmpresasBorrar.length; j++) {
                    if(oldEncuesta.listaEmpresasLanzadas[i].nombre===listaEmpresasBorrar[j].nombreEmpresa){
                        oldEncuesta.listaEmpresasLanzadas[i]="";
                        console.log("borro esto padreee")
                    }
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



exports.deleteLanzamientoEmpresas= async function(encuestasLanzadas){
    try{
        var id=encuestasLanzadas
        console.log("La encuesta que va a borrar es:" ,id)
        
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