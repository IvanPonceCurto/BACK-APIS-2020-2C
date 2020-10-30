var express = require('express')
var router = express.Router()
var EncuestaController = require('../../controllers/Encuesta.controller');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a api/encuestas.routes');
  });
router.post('/newEncuesta', EncuestaController.createEncuesta)
router.get('/encuestasDeLaBDD',  EncuestaController.getEncuestasDeLaBDD)
router.get('/encuesta/:id',EncuestaController.getEncuesta)
router.get('/encuestasDeLaAPI',EncuestaController.getEncuestasDeLaAPI)

// Export the Router
module.exports = router;


//Habria que generar el link de ambos metodos, del encuestasApi y que itere directo sobre ese .json y que los genere

//Funcionan todos los metodos probados!