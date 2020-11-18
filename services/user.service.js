// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');
var Empresa = require('../models/Empresa.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Users = await User.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Users;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Users');
    }
}

exports.getUsersById=async function(idUsuario){
    console.log("El id del Usuario por el que quiere buscar es: " , idUsuario)
    try{
        var UsuarioDevolver= await User.findById(idUsuario)
        console.log(UsuarioDevolver)
        return UsuarioDevolver
    }catch(e){
        throw new Error("Error al traer el usuario por el id");
    }

}

exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    
    
    var newUser = new User({
        
        nombreUsuario: user.nombreUsuario,
        flag:user.flag,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        password: hashedPassword,
        date: new Date()
       
    })

    console.log("El usuario que guarda es:"+newUser)

    try {
        console.log("entre al try")
        // Saving the User 
        var savedUser = await newUser.save();

        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating User")
    }
}

exports.updateUser = async function (user) {
    
    var idUser = user.id

    try {
        //Find the old User Object by the Id
        var oldUser = await User.findById(idUser);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    //Edit the User Object
    //var hashedPassword = bcrypt.hashSync(user.password, 8);
    oldUser.nombreUsuario = user.nombreUsuario
    oldUser.email = user.email
    oldUser.nombre = user.nombre
    oldUser.apellido = user.apellido
    //oldUser.password = hashedPassword
    try {
        var savedUser = await oldUser.save()
        console.log("USUARIO GUARDADO")
        console.log(savedUser)
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.deleteUser = async function (id) {

    // Delete the User
    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}


exports.loginUser = async function (usuario) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        console.log("login:",usuario)
        var _details = await User.findOne({
            nombreUsuario: usuario.nombreUsuario
           

        });
        console.log(_details)

        var _detailsEmpresa = await Empresa.findOne({
            nombreEmpresa: usuario.nombreUsuario
        });

        console.log(_detailsEmpresa)
        if(_details !== null){
                var passwordIsValid = bcrypt.compareSync(usuario.password, _details.password);
                if (!passwordIsValid) throw Error("Invalid username/password")

                var token = jwt.sign({
                    id: _details._id
                }, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                return {token:token, user:_details};
        }
        else{
            console.log("ENTRE AL ELSE"+_detailsEmpresa.password)
            var passwordIsValid = bcrypt.compareSync(usuario.password, _detailsEmpresa.password);
            console.log(passwordIsValid)
                if (!passwordIsValid) throw Error("Invalid username/password")
                
                var token = jwt.sign({
                    id: _detailsEmpresa._id
                }, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                return {token:token, user:_detailsEmpresa};
        }
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}