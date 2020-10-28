/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var empresa=require('./api/Empresa.route')
var respuesta=require('./api/RespuestaEncuesta')
var lanzamientoEncuesta=require('./api/LanzamientoEncuesta.route')
router.use('/users', users);
router.use('/empresas',empresa)
router.use('/respuestaEncuesta',respuesta)
router.use('/lanzamientoEncuesta',lanzamientoEncuesta)

module.exports = router;
