let nodemailer = require('nodemailer');


const nuevaEncuesta="USTED HA SIDO INVITADO A RESPONDER LA SIGUIENTE ENCUESTA";
const nearDueDate="LA ENCUESTA %s ESTA CERCA DE VENCER"; 
const dueDate="LA ENCUESTA %s VENCIÓ"
const outOfPoll="USTED HA SIDO RETIRADO DE LA ENCUESTA"; 
const allPolls="LA ENCUESTA %s HA SIDO COMPLETADA POR TODOS LOS PARTICIPANTES"

class MailUsuario{
    //En proceso de definicion de las casuisticas del usuario.

    static deseaMail=false; // a ksa
    //Esto lo defini en caso de que no quiera recibir notificaciones amigo.

    constructor(mail,encuestaAsociada,tiempoRestante){
        this.mail=mail;
        this.encuestaAsociada=encuestaAsociada;
        this.tiempoRestante=tiempoRestante;
    }
}
//Al usuario le interesaria saber:
/*
    1)Cuando lo invitan a una encuesta
    2)Cuando se lee sta por vencer una encuesta
    3)Cuando se le vence una encuesta
    4)Cuando lo sacan de una encuesta --> Veremos. / ha finalizado la encuesta el observatorio

*/ 



class MailUsuarioObservatorioPyme{
    constructor(mail,encuestaRespondida,empresaAsociada){
        this.mail=mail;
        this.encuestaRespondida=encuestaRespondida;
        this.empresaAsociada=empresaAsociada;
    }
}


//-----USER OBSERVATORIO PyME----
//Que le interesa saber al usuario del Observatorio Pyme?
//eEntonces lo que se me ocurrio fue  mandar solo cuando esta completamente respondida la encuesta, que otras opcion podrian ir?
//Ha vencido el plazo de la encuesta. --> clave.

exports.sendEmail = async function (req, res, next){
    //En la request a mi se me ocurre que podrian venir los datos que necesitamos.
    var sendMail={
        //Simularia agarrar los datos directo del request, req.body.sendMail.
        mailUsuario:String,
        encuestaAsociada:String,
        timpoRestante:Int16Array,
        id:Int16Array
    }

    /*
        id:1,
        datos:{
            mailUsuario:String,
            encuestaAsociada:String,
            timpoRestante:Int16Array,
        }
    */

    switch(req.body.sendMail.id){
        case 1:
            //Envio mail al usuario, y lo crearia aca
        case 2:
            //Envio mail al observatorio Pyme
    }


    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        //host: 'svp-02715.fibercorp.local',
        //secure: false,
        port:25,
        service: 'Gmail',
        auth: {
            user: 'franciscofares23@gmail.com',//poner cuenta gmail
            pass: process.env.CONTRASEÑA_MAGICA  //contraseña cuenta  IMPORTANTE HABILITAR acceso apps poco seguras google
        }
     });
    // Definimos el email
    var mailOptions = {
        from: 'pruebalabs@gmail.com',
        to: req.body.destinatario,
        subject: req.body.asunto,
        html: '<h1> y aca se muestra el texto  </h1><h3>' +req.body.texto+'</h3>',
        
    };
    console.log("mail",mailOptions)
    
    try
    {
        let info = await transporter.sendMail(mailOptions);
        console.log("El mensaje al usuario ha sido enviado", info.messageId);
    }
    catch(error)
    {
        console.log("Error envio mail: ",error);            
    }
};

//Podemos definir el html aparte y no desde el propio mail? Y hacerlo un poco mas lindo, tipo como si fuese una card y demás, creo que quedaría piola.

