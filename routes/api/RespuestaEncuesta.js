var express = require('express')
var router = express.Router()
var ExponerRespuestaController = require('../../controllers/ExponerRespuestaController');



router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/respuestaEncuesta');
  });
router.get('/getEncuesta', ExponerRespuestaController.getEncuesta)


// Export the Router
module.exports = router;



//api/users
//api/users/registration
//api/users/login