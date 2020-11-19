var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userProfileSchema = new Schema({
    idEmpresa: Object,
    nombreEmpresa: String,
    razonSocial: String,
    email: String,
    numTel: String,
    ciudad: String,
    localidad: String,
    zip: String,
    hist: String,
    mision: String,
    vision: String
},{collection:"userProfile"})

var userProfile = mongoose.model('userProfile', userProfileSchema)
module.exports = userProfile

