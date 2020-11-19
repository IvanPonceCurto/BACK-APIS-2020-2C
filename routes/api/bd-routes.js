let router = require('express').Router();
let bdController = require('../../controllers/bd-controller'); 
let apiController = require('../../controllers/api-controller');

router.get('/', function (req, res) 
{
    res.json(
    {
       status: 'Funcionando',
    });
});
 
//EndPoint para leer todas las respuestas en la bd
router.get('/respuestas', function(req, res){
    console.log("Leer respuestas");
    bdController.getRespuestas(req, res);
});

//EndPoint para leer todas las respuestas de un usuario
router.post('/respuestas/user', function(req, res)
{
    console.log("Leer respuestas de un user en particular");
    bdController.getRespuestaSingle(req, res);
});

router.post('/eliminarRespuesta', function(req,res){
    bdController.deleteRespuesta(req,res)
})

//EndPoint para leer todas las respuestas de un usuario que no estén respondidas
router.post('/respuestas/user/notCompleted', function(req, res)
{
    console.log("Leer encuestas sin responder de un user en particular");
    //Esta bien que tenga el completed? Yo porque no conozco el $ne, sisi esta perfecto, el $ne te trae en el documento de mongo los campos que tengan ese valor diferente.
    
    bdController.getRespuestaSingleSinResp(req, res);
});

//EndPoint para leer una encuesta en particular
router.post('/respuestas/id', function(req, res)
{
    console.log("Leer una encuesta en particular");
    bdController.getRespuestaById(req, res);
});

//EndPoint para insertar una respuesta
router.post('/insertRespuesta',function(req,res)
{
    console.log("Agregar respuesta")
    console.log(req.body);
    bdController.insertRespuesta(req,res);
});

//EndPoint para actualizar una respuesta
router.post('/updateRespuesta',function(req,res)
{
    bdController.updateRespuesta(req,res);
});

//EndPoint para actualizar el estado de una encuesta a "completed"
router.post('/updateEncuesta',function(req, res)
{
    bdController.updateEncuesta(req, res)
})

//EndPoint para subir un archivo
router.post('/uploadFile', function(req,res)
{
    bdController.uploadFile(req, res)
})
router.get('/encuestas', function(req, res){
    console.log("Leer encuestas");
    apiController.getEncuestas(req, res);//uso el controller, acá esta codeado qué tiene que hacer
});

//EndPoint para crear un perfil de usuario
router.post('/createUser', function(req, res)
{
    bdController.createUser(req, res)
})

//EndPoint para buscar un usuario
router.post('/getUser', function(req, res)
{
    bdController.getUser(req, res)
})

//EndPoint para actualizar un perfil
router.post('/updateProfile', function(req, res)
{
    bdController.updateProfile(req, res)
})
module.exports = router;