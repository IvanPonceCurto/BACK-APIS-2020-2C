var express = require('express')
var router = express.Router()
var EmpresaController = require('../../controllers/Empresa.controller');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a api/empresas.routes');
  });
router.post('/newEmpresa', EmpresaController.createEmpresas)
router.get('/empresas',  EmpresaController.getEmpresas)
router.post('/empresas/empresasPorId', EmpresaController.getEmpresasById)
router.put('/empresas/update/', EmpresaController.updateEmpresa)
router.delete('/:id', EmpresaController.removeEmpresa)

// Export the Router
module.exports = router;



//api/empresas/newEmpresa
//api/empresas/empresas
//api/empresas/update
//api/empresas/:id