var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var encuestaAPISchema = new Schema({
    idEncuesta:Number,
    poll_title:String,
    poll_state:String,
    created:Date,
    modified:Date,
    questions:[{
        index:Number,
        q_type:String,
        value:String,
        mandatory:Boolean,
        options:[{option:String}],
        filters:[{min:Number,max:Number}],
        extenFilters:[{extension:String, max_size:Number}],
        textFilters:[{max_size:Number}],
    }]
},{collection:'encuestas'});

var encuestasAPI= mongoose.model('encuestaAPI',encuestaAPISchema);
console.log('Se creó el modelo: EncuestaAPI');
module.exports = encuestasAPI;