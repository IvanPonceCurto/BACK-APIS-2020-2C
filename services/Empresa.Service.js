// Gettign the Newly created Mongoose Model we just created 
var Empresa = require('../models/Empresa.model');
var userProfile = require('../models/userProfile.model')
var {v4:uuidv4}=require('uuid')
var bcrypt = require('bcryptjs');
_this = this

exports.getEmpresasById=async function(idEmpresa){
    console.log("El id de la empresa por el que quiere buscar es: " , idEmpresa)
    try{
        var EmpresaDevolver= Empresa.findById(idEmpresa)
        return EmpresaDevolver
    }catch(e){
        throw new Error("Error al traer a la empresa por el id");
    }

}
exports.getEmpresas = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Empresas = await Empresa.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Empresas;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error al traer todas las empresas registradas en la base!');
    }
}

exports.createEmpresa = async function (empresa) {
    // Creating a new Mongoose Object by using the new keyword
    var codigo=uuidv4();
    var hashedPassword = bcrypt.hashSync(empresa.password, 8);
    var newEmpresa = new Empresa({
        idEmpresa:codigo,
        flag:empresa.flag,
        nombreEmpresa: empresa.nombreEmpresa,
        password:hashedPassword,
        razonSocial: empresa.razonSocial,
        CUIT: empresa.CUIT,
        responsable: empresa.responsable,
        timestamp:new Date()
    })
    var profileUser = new userProfile({
        idEmpresa: newEmpresa.idEmpresa,
        nombreEmpresa: newEmpresa.nombreEmpresa,
        razonSocial: newEmpresa.razonSocial,
        email: "",
        numTel: "",
        ciudad: "",
        localidad: "",
        zip: "",
        hist: "",
        mision: "",
        vision:""
    })
    //Controller --> Service --> DAO (Le pega a la BDD) --> Schema de Mongo
    try {
        // Guardando la empresa 
        var savedProfileUser = await profileUser.save();
        var savedUser = await newEmpresa.save();
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error creando la empresa")
    }
}

exports.updateEmpresa = async function (empresa) {
    var id = empresa.idEmpresa
    try {
        //Find the old Empresa Object by the Id
        var oldEmpresa = await Empresa.findById(id); //Funcionara?
    } catch (e) {
        throw Error("Ha ocurrido un error al tratar de buscar la empresa.")
    }
    // If no old Empresa Object exists return false
    if (!oldEmpresa) {
        return false;
    }
    //Que datos podes editar de la empresa?
    oldEmpresa.nombreEmpresa = empresa.nombreEmpresa
    oldEmpresa.razonSocial = empresa.razonSocial
    oldEmpresa.responsable= empresa.responsable
    try {
        var savedEmpresaNueva = await oldEmpresa.save()
        return savedEmpresaNueva;
    } catch (e) {
        throw Error("Ocurrio un error tratando de guardar la nueva empresa");
    }
}

exports.deleteEmpresa = async function (idEmpresa) {

    // Delete the Empresa
    try {
        var deleted = await Empresa.remove({
            _id: idEmpresa
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("La empresa no pudo ser borrado")
        }
        return deleted;
    } catch (e) {
        throw Error("Ocurrio un error tratando de borrar la empresa")
    }
}

