var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    nombreUsuario: String,
    flag:Number,
    email: String,
    nombre:String,
    apellido:String,
    password: String,
    date: Date
},{collection:'usuarios'})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)


module.exports = User;

//Boton de actualizar encuestas hasta el momento y 
