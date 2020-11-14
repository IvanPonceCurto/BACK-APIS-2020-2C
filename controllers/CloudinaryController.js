var EmpresaController=require('../services/Empresa.Service');
var EncuestasController=require('../services/Encuesta.Service');
const { options } = require('../routes/api/user.route');
const router = require('../routes/api/user.route');
var cloudinary=require('cloudinary').v2;

_this=this;

cloudinary.config({ 
    cloud_name: 'apisbackfranivan', 
    api_key: '291692491198663', 
    api_secret: 'YMATgrzrFGfPtKihy_HY0Dxa4ms'
});
CLOUDINARY_URL='cloudinary://291692491198663:YMATgrzrFGfPtKihy_HY0Dxa4ms@apisbackfranivan'
const listaFormatosPermitidos=['jpg','pdf','doc','docx','txt','xls','xlsx','jpeg']
//Configuracion hecha, deberiamos desarrollar los Use Cases.

//Subir un  archivo, bajar un archivo, buscar un archivo por id.



exports.subirDocumentosDigitales=async function(req,res){
    var archivo=req.body.nombreArchivo;
    var idEmpresa=req.body.idEmpresa;
    var idEncuesta=req.body.idEncuesta;
    console.log(idEmpresa)
    console.log(idEncuesta)
    console.log(archivo)
    var cantidadFotos= await contarDocumentosDigitales()//Llamo al metodo que cuenta la cantidad de fotos.
    //La relacion seria entre una empresa, y una encuesta, entonces le podria poner: CUIT+"-"+idEncuesta+"-"+cantidadFotos;
  
    
    try{
        var Empresa=await EmpresaController.getEmpresasById(idEmpresa);
        var Encuesta=await EncuestasController.getEncuestaById(idEncuesta);
    }catch(e){
        throw new Error(e)
    }
    
    
    var publicNombre=Empresa.CUIT+"-"+Encuesta.idEncuesta+"-"+cantidadFotos;
    console.log("El nombre con el que guardaria el archivo es:+",publicNombre)
    try{
        var resultado= await cloudinary.uploader.upload(archivo,{public_id:publicNombre},function(err,resp){
        if(err){
            return "No se pudo subir"
        }

        console.log("hizo todo ok")

        return res.status(200).json(resp);
        })
    }catch(e){
        console.log("Error",e)
    }
}

exports.downloadDocumentosDigitales=async function(req,res){
    var listaNombres=req.body.listNombres;
    var tipoArchivo=req.body.tipoArchivo;
    console.log(listaNombres)
    var string=await cloudinary.utils.download_zip_url(
        {
            public_ids:listaNombres
        }
    );
    return res.status(200).json(string);
}

const contarDocumentosDigitales=async function(req,res){
    var contador=0;
    try{
        var hola=await cloudinary.api.resources_by_ids(["Ivan-Ponce-10-10","Ivan-Ponce-10-10.pdf"],function(err,result){ 
        if(err){
            throw new Error("Error al contar los archivos del usuariuo")
        }else{
            console.log(result)
            console.log("tamaño:" +result.resources.length)
            contador=result.resources.length
        }
        });
    }   catch(e){
            console.log("Error: ",e)
    }
    return contador;
    }

const validateFormat=(extensionArchivo)=>{
    listaFormatosPermitidos.forEach(element => {
        if(element===extensionArchivo){
            return true;
        }
    });
    return false;
}