var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: Date,
    empresa:String
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;


//TODO --> Ver que modelos necesitamos
//TODO --> Implementar como quedaria un post con la ruta de las encuestas.
//Si es nuestra parte, necesitariamos los siguientes modelos:
    //      USUARIOS (Lo comparten las 3 partes el GET, pero solo 1 el POST--> Roberto (miento, nosotros tambien por el tema de los nuevos usuarios))
    //      ENCUESTAS (Nosotros tenemos la parte del POST, y Lucas y Leo, la parte del GET de la misma.)
    //      El GET de usuarios tambien lo necesitamos para poder traer los que estan, una relacion entre usuarios y encuestas tambien.
    //      Diagramar el modelo en Paint o algo para que quede y sea visual.
    //      Tabla que relacione, o mejor dicho, coleccion que relacione idUsuario,idEncuesta,bit. --> El bit representa el completada o no.
    //      
