const Empresa = require('../models/Empresa.model');
var EmpresaService = require('../services/Empresa.Service');

// Saving the context of this module inside the _the variable
_this = this; // --> Porque lo hace, no lo se rick.

// Async Controller function to get the To do List
exports.getEmpresas = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Empresas = await EmpresaService.getEmpresas({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Empresas, message: "Empresas recibidas correctamente"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
exports.getEmpresasById=async function (req,res){
    var idEmpresa=req.params.id ? req.params.id:-1;
    if(idEmpresa!=-1){
        try{
        var EmpresasReturn=await EmpresaService.getEmpresasById(idEmpresa);
        return res.status(200).json({status:200,data:EmpresasReturn,message:"Empresa recibida con exito"})
        }catch(e){
            return res.status(400).json({status:400,message:e.message})
        }   
    }

}
exports.createEmpresas = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("Crear empresas con los siguientes datos: " ,req.body)
    var body= req.body.nombreEmpresa? req.body.nombreEmpresa:-1;
    if(body!=-1){
        var Empresa={
            nombre:req.body.nombreEmpresa,
            razonSocial: req.body.razonSocial,
            CUIT: req.body.CUIT,
            responsable: req.body.responsable

        }
    }
    
    try {
        // Calling the Service function with the new object from the Request Body
        var createdEmpresa = await EmpresaService.createEmpresa(Empresa)
        return res.status(201).json({token: createdEmpresa, message: "Empresa creada correctamente"})
        //Supongo que el token seria como un ResponseEntity<> de Java
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo crear la empresa"})
    }
}

exports.updateEmpresa = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var idEmpresa= req.body._id;
    var Empresa = {
        idEmpresa,
        nombre: req.body.nombre ? req.body.name : null,
        razonSocial: req.body.razonSocial ? req.body.razonSocial : null,
        responsable: req.body.responsable ? req.body.responsable : null
    }
    try {
        var updatedEmpresa = await EmpresaService.updateEmpresa(Empresa)
        return res.status(200).json({status: 200, data: updatedEmpresa, message: "Empresa actualizada correctamente"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeEmpresa = async function (req, res, next) {

    //Viene por PathVariable --> Ojaldre con esto
    var id = req.params.id;
    id=req.params.id ? req.params.id : false
    if(id){
        try{
        var deleted = await EmpresaService.deleteEmpresa(id);
        res.status(200).send("Succesfully Deleted... ");
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    }else{
    
        return res.status(400).json({status: 400, message: e.message})
    }
}



    
    
