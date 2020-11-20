var express = require('express')
var router = express.Router()
var LanzamientoEncuestaController = require('../../controllers/LanzamientoEncuestaController');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a el EndPointn de LanzamientoEncuesta');
  });
router.post('/newLanzarEncuesta', LanzamientoEncuestaController.postLanzamientoEncuesta)
router.get('/encuestasLanzadas',  LanzamientoEncuestaController.getEncuestasLanzadas)
router.put('/encuestasLanzadas/update', LanzamientoEncuestaController.updateLanzamientoEncuesta)
router.delete('/encuestasLanzadas/delete', LanzamientoEncuestaController.removeLanzamiento)
router.post('/getLanzamientoById', LanzamientoEncuestaController.getLanzamientoById)

// Export the Router
module.exports = router;



