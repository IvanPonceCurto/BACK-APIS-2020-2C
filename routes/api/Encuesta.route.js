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
router.get('/encuesta',EncuestaController.getEncuesta)
router.get('/encuestasDeLaAPI',EncuestaController.getEncuestasDeLaAPI)

// Export the Router
module.exports = router;



//api/empresas/newEmpresa
//api/empresas/empresas
//api/empresas/update
//api/empresas/:id