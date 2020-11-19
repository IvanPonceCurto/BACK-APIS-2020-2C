var bdService = require('../services/bd-services')
const e = require('express');
const Formidable = require('formidable')
const bluebird = require('bluebird')
var fs = require('fs');
var fs = bluebird.promisifyAll(require('fs'))
var {join} = require('path');
require('dotenv').config();

exports.getRespuestas = async function (req, res)
{
    try{
        var result = await bdService.getRespuestas();
        return res.status(200).send(result);
    }
    catch(e){
        return res.status(500).send(e);
    }
};

exports.getRespuestaSingle = async function(req, res)
{
    try{
        let userId = {userId: req.body.userId};
        var result = await bdService.getRespuestaSingle(userId)
        return res.status(200).send(result)
    }catch(e){
        return res.status(500).send(e);
    }
};

exports.getRespuestaSingleSinResp = async function(req, res)
{
    try{
        let query = {userId: req.body.userId, status:{$ne: "completed"}};
        var result = await bdService.getRespuestaSingleSinResp(query)
        
        return res.status(200).send(result)
    }catch(e){
        return res.status(500).send(e);
    }
};


exports.getRespuestaById = async function (req, res)
{
    try{
        let idEncuesta = {idEncuesta: req.body.idEncuesta};
        var results = await bdService.getRespuestaById(idEncuesta)
        return res.status(200).send(results); //devuelvo resultado query   
    }catch(e){
        return res.status(500).send(e);
    }
};

exports.insertRespuesta = async function (req, res)
{
    try{
        var dataBody = {
        idEncuesta: req.body.idEncuesta,
        idLanzamiento: req.body.idLanzamiento,
        userId: req.body.userId,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        created: req.body.created,
        modified: req.body.modified,
        sections: req.body.sections}
        var results = await bdService.insertRespuesta(dataBody);
        return res.status(200).send(results)

    }
    catch(e){
        return res.status(500).send(e)
    }
};

exports.deleteRespuesta = async function (req, res)
{
    var idEncuesta = req.body.idEncuesta;
    var idEmpresa = req.body.idEmpresa;
    var idLanzamiento = req.body.idLanzamiento
    try{
        var deleted = await bdService.deleteRespuesta(idEncuesta,idEmpresa,idLanzamiento)
        res.status(200).send("Succesfully Deleted... ");
    }
    catch(e){
        throw new Error(e)
    }
};

exports.obtenerRespuesta = async function (req, res)
{
    var idEmpresa = req.body.idEmpresa;
    var idLanzamiento = req.body.idLanzamiento
    try{
        var deleted = await bdService.obtenerRespuesta(idEmpresa,idLanzamiento)
        return res.status(200).json({status: 200, data: deleted, message: "Respuesta devuelta exitosamente"});
    }
    catch(e){
        throw new Error(e)
    }
};



exports.updateRespuesta = async function (req,res) 
{
    try{
        let query = {idEncuesta: req.body.idEncuesta}
        let sectionIndex = req.body.sectionIndex
        let questionIndex = req.body.questionIndex
        let value = req.body.value
        var results = await bdService.updateRespuesta(query, sectionIndex, questionIndex, value)
        return res.status(200).send(results)
    }catch(e){
        console.log(e)
        return res.status(500).send(e)
    }
}

exports.updateEncuesta = async function (req, res)
{
    try{
        let idEncuesta = {idEncuesta: req.body.idEncuesta}
        var results = await bdService.updateEncuesta(idEncuesta)
        return res.status(200).send(results)
    }catch(e){
        console.log(e)
        return res.status(500).send(e)
    }
}

async function checkCreateUploadsFolder (uploadsFolder) {
    try 
    {
		await fs.statAsync(uploadsFolder)
    } 
    catch (e) 
    {
        if (e && e.code == 'ENOENT') 
        {
			console.log('The uploads folder doesn\'t exist, creating a new one...')
            try 
            {
				await fs.mkdirAsync(uploadsFolder)
            } 
            catch (err) 
            {
				console.log('Error creating the uploads folder 1')
				return false
			}
        } 
        else 
        {
			console.log('Error creating the uploads folder 2')
			return false
		}
	}
	return true
}

function checkAcceptedExtensions (file) 
{
	const type = file.type.split('/').pop()
	const accepted = ['jpeg', 'jpg', 'png', 'gif', 'pdf','webp', 'json']
	if (accepted.indexOf(type) == -1) {
		return false
	}
	return true
}

exports.uploadFile = async function (req, res)
{
    //console.log("req",req.body);
    let form = Formidable.IncomingForm()
    //console.log("form",form);
    const uploadsFolder = process.env.MOCK_DIR;
    console.log("uploadFolder",uploadsFolder);
	form.multiples = true
	form.uploadDir = uploadsFolder
	form.maxFileSize = 50 * 1024 * 1024 // 50 MB
	const folderCreationResult = await checkCreateUploadsFolder(uploadsFolder)
	if (!folderCreationResult) {
		return res.json({ok: false, msg: "The uploads folder couldn't be created"})
	}
	form.parse(req, async (err, fields, files) => {
		let myUploadedFiles = []
		if (err) {
			console.log('Error parsing the incoming form',err)
			return res.json({ok: false, msg: 'Error passing the incoming form'})
		}
		// If we are sending only one file:
		if (!files.files.length) {
			const file = files.files
			if (!checkAcceptedExtensions(file)) {
				console.log('The received file is not a valid type')
				return res.json({ok: false, msg: 'The sent file is not a valid type'})
			}
			const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
			myUploadedFiles.push(fileName)
			try {
				await fs.renameAsync(file.path, join(uploadsFolder, fileName))
			} catch (e) {
				console.log('Error uploading the file')
				try { await fs.unlinkAsync(file.path) } catch (e) {}
				return res.json({ok: false, msg: 'Error uploading the file'})
			}
		} else {
			for(let i = 0; i < files.files.length; i++) {
				const file = files.files[i]
				if (!checkAcceptedExtensions(file)) {
					console.log('The received file is not a valid type')
					return res.json({ok: false, msg: 'The sent file is not a valid type'})
				}
				const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
				myUploadedFiles.push(fileName)
				try {
					await fs.renameAsync(file.path, join(uploadsFolder, fileName))
				} catch (e) {
					console.log('Error uploading the file')
					try { await fs.unlinkAsync(file.path) } catch (e) {}
					return res.json({ok: false, msg: 'Error uploading the file'})
				}
			}
		}
		res.json({ok: true, msg: 'Files uploaded succesfully!', files: myUploadedFiles})
	})
}

exports.createUser = async function (req, res)
{
    try{
        let dataBody = {
        userId: req.body.idEmpresa,
        nombreUser: req.body.nombreEmpresa,
        razSoc: req.body.razonSocial,
        email: req.body.email,
        numTel: req.body.numTel,
        ciudad: req.body.ciudad,
        localidad: req.body.localidad,
        zip: req.body.zip,
        hist: req.body.hist,
        mision: req.body.mision,
        vision: req.body.vision}
        var results = await bdService.createUser(dataBody)
        return res.status(200).send(results)
    }catch(e){
        return res.status(500).send(e)
    }
}

exports.getUser = async function (req, res)
{
    try{
        let idEmpresa = req.body.idEmpresa
        var results = await bdService.getUser(idEmpresa)
        return res.status(200).send(results)
    }catch(e){
        return res.status(500).send(e)
    }
}

exports.updateProfile = async function (req, res)
{
    try{
        let idEmpresa = req.body.idEmpresa
        let email = req.body.email
        let numTel = req.body.numTel
        let ciudad = req.body.ciudad
        let zip = req.body.zip
        let hist = req.body.hist
        let mision = req.body.mision
        let vision = req.body.vision
        var results = await bdService.updateProfile(idEmpresa, email, numTel, ciudad, zip, hist, mision, vision)
        return res.status(200).send(results)
    }catch(e){
        return res.status(500).send(e)
    }
}