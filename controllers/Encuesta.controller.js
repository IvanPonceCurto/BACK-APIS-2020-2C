var EncuestaService = require('../services/Encuesta.Service');

// Saving the context of this module inside the _the variable
_this = this; // --> Porque lo hace, no lo se rick.

// Async Controller function to get the To do List
exports.getEncuestasDeLaBDD = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Encuestas = await EncuestaService.getEncuestasBDD({}, page, limit)
        return res.status(200).json({status: 200, data: Encuestas, message: "Encuestas recibidas correctamente"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getEncuestasDeLaAPI = async function (req, res, next) {
     const url = 'Pepe' //URL DE LA API
    try {
        var Encuestas = await EncuestaService.getEncuestasAPI(url)
        // Return the Polls list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Encuestas, message: "Encuestas recibidas correctamente"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}


exports.getEncuesta = async function (req, res, next) {

    var id = req.params.id ? req.params.id : -1;
    console.log("El id de la encuesta que trae es: " +id)
    try {
        var Encuesta = await EncuestaService.getEncuesta(id) 
        // Return the Polls list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Encuesta, message: "Encuesta recibida correctamente"});
        
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createEncuesta = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var body= req.body.tituloEncuesta? req.body.tituloEncuesta:-1;
    if(body!=-1){
        var Encuesta={
            
                //Aca creo el schema que va a tener la coleccion.
                
                tituloEncuesta:req.body.tituloEncuesta,
                estadoEncuesta:req.body.estadoEncuesta,
                descripcion:req.body.descripcion,
                created:req.body.created,
                modified:req.body.modified,
                preguntas:{
                total: req.body.total,
                values: req.body.values
                }
           
        }
    }
    
    try {
        // Calling the Service function with the new object from the Request Body
        var createdEncuesta = await EncuestaService.createEncuesta(Encuesta)
        return res.status(201).json({token: createdEncuesta, message: "Encuesta creada correctamente"})
        //Supongo que el token seria como un ResponseEntity<> de Java
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo crear la encuesta"})
    }
}







    
    
