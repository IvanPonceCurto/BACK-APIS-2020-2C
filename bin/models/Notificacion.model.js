var moongose=require('mongoose')
var moongoPagination=require('mongoose-paginate')

var NotificacionSchema= new moongose.Schema({
    tipo:String,
    mensaje:String,
    idUsuario:Int16Array
})

moongose.plugin(moongoPagination)

const Notificacion=moongose.model('Notificacion',NotificacionSchema);

module.exports('Notificacion')

//Ver lo del Socket.io
