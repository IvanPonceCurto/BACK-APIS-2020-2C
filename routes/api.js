/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var empresa=require('./api/Empresa.route')
var encuesta = require('./api/Encuesta.route')
router.use('/users', users);
router.use('/empresas',empresa);
router.use('/encuestas',encuesta);

module.exports = router;
