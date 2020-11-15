let nodemailer = require('nodemailer');


exports.sendEmail = async function (req, res, next){
    
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        //host: 'svp-02715.fibercorp.local',
        //secure: false,
        port:25,
        service: 'Gmail',
        auth: {
            user: 'franciscofares23@gmail.com',//poner cuenta gmail
            pass: 'morita2010'  //contraseña cuenta  IMPORTANTE HABILITAR acceso apps poco seguras google
        }
     });
    // Definimos el email
    var mailOptions = {
        from: 'pruebalabs@gmail.com',
        to: req.body.destinatario,
        subject: req.body.asunto,
        html: '<h1> Observatorio Pyme  </h1><h3>' +req.body.texto+'</h3>',
        
    };
    console.log("mail",mailOptions)
    // Enviamos el email
    try
    {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return res.status(201).json({ message: "Mail Lanzado correctamente"})
    }
    catch(error)
    {
        console.log("Error envio mail: ",error); 
        return res.status(400).json({status: 400, message: "No se pudo mandar el mail"})           
    }
};