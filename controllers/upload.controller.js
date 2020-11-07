const Formidable = require('formidable')
const bluebird = require('bluebird')
var fs = require('fs');
var fs = bluebird.promisifyAll(require('fs'))
var {join} = require('path');



// Returns true if successful or false otherwise
async function checkCreateUploadsFolder (uploadsFolder) {
    try 
    {
		await fs.statAsync(uploadsFolder)
    } 
    catch (e) 
    {
        if (e && e.code == 'ENOENT') 
        {
			console.log("La carpeta que se quiere crear no existe, se esta creando la carpeta.")
            try 
            {
				await fs.mkdirAsync(uploadsFolder)
            } 
            catch (err) 
            {
				console.log('No se puede crear la carpeta')
				return false
			}
        } 
        else 
        {
			console.log('No se puede crear la carpeta.')
			return false
		}
	}
	return true
}

const accepted = ['jpeg', 'jpg', 'png', 'gif', 'pdf','webp']
function checkAcceptedExtensions (file) 
{
	const type = file.type.split('/').pop()
	if (accepted.indexOf(type) == -1) {
		return false
	}
	return true
	//Se fija si la extension existe y es valida dentro de lo que permitimos, sino nos tira -1.

}

exports.uploadFiles = async function (req, res, next) {
    //Formidable se usa para parsear los datos de un archivo para poder guardarlos.
    let form = Formidable.IncomingForm()
    
    const uploadsFolder = process.env.UPLOAD_DIR
    
	form.multiples = true
	form.uploadDir = uploadsFolder
	form.maxFileSize = 50 * 1024 * 1024 // 50 MB
	const folderCreationResult = await checkCreateUploadsFolder(uploadsFolder)
	if (!folderCreationResult) {
		return res.json({ok: false, msg: "La carpeta no pude ser creada."})
	}
	form.parse(req, async (err, fields, files) => {
		let myUploadedFiles = []
		if (err) {
			console.log('Ocurrio un error.',err)
			return res.json({ok: false, msg: 'Error parseando el form de entrada.'})
		}
		// If we are sending only one file:
		if (!files.files.length) {
			const file = files.files
			if (!checkAcceptedExtensions(file)) {
				console.log('EL tipo de archivo recibido no es valido.')
				return res.json({ok: false, msg: 'El tipo de archivo enviando no es valido, lista de archivos validos --> '+accepted.toString()})
			}
			const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
			myUploadedFiles.push(fileName)
			try {
				await fs.renameAsync(file.path, join(uploadsFolder, fileName))
			} catch (e) {
				console.log('Error subiendo el archivo')
				try { await fs.unlinkAsync(file.path) } catch (e) {}
				return res.json({ok: false, msg: 'Error subiendo el archivo'})
			}
		} else {
			for(let i = 0; i < files.files.length; i++) {
				const file = files.files[i]
				if (!checkAcceptedExtensions(file)) {
					console.log('El tipo de archivo recibido no es valido')
					return res.json({ok: false, msg: 'El tipo de archivo no es valido'})
				}
				const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
				myUploadedFiles.push(fileName)
				try {
					await fs.renameAsync(file.path, join(uploadsFolder, fileName))
				} catch (e) {
					console.log('Error subiendo el archivo')
					try { await fs.unlinkAsync(file.path) } catch (e) {}
					return res.json({ok: false, msg: 'Error subiendo el archivo'})
				}
			}
		}
		res.json({ok: true, msg: 'Archivos subidos con exito!', files: myUploadedFiles})
	})
}
