/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var empresas=require('./api/Empresa.route')


router.use('/users', users);
router.use('/empresas',empresas);

module.exports = router;
