var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var preguntaSchema = new Schema({
    questionIndex:Number,
    questionTitle:String,
    questionType:String,
    value:String,
    mandatory:Boolean,
    multiline:Boolean,
    adornment:String,
    restrictions:{min:Number,max:Number},
    options:[{option:String}]
},{_id:false});

var sectionsSchema = new Schema({
    sectionIndex:Number,
    sectionTitle:String,
    sectionDescription:String,
    questions:[preguntaSchema]
},{_id:false})

var encuestaBDSchema = new Schema({
    idEncuesta:Number,
    userId:Object,
    name:String,
    description:String,
    status:String,
    created:Date,
    modified:Date,
    questions:Object,
    answered:Number,
    mandatory:Number
},{collection:'respuestas'});

var encuestasBD= mongoose.model('encuestaBD',encuestaBDSchema);
console.log('Se creó el modelo: EncuestaBD');
module.exports = encuestasBD;