//Ver lo del Socket.io
class Notificacion{
    static listaTipos=["Nueva encuesta","Cerca de vencerse","Se vencio la encuesta"]
    constructor(tipo,mensaje,idUsuario){
        this.idUsuario=idUsuario;
        this.tipo=tipo;
        this.mensaje=mensaje
    }
}

var listaNotificacionesMockeadas=[{
    idUsuario:1,
    tipo:"Nueva encuesta",
    mensaje:"Responde la encuesta flaco"
},{
    idUsuario:1,
    tipo:"Se te va a vencer la encuesta pa",
    mensaje:"Responde la encuesta flaco"
}]
//Mandar el mail, y que se dispare la notificacion en la aplicacion.

const funcion= ()=>{
    return listaNotificacionesMockeadas;
}


module.exports={
    funcion
}