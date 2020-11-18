let router = require('express').Router();
let apiController = require('../controllers/api-controller');


router.get('/', function (req, res) 
{
    res.json(
    {
       status: 'Funcionando',
    });
});

//EndPoint para leer las encuestas que nos pase Crear Encuestas
router.get('/encuestas/LL', function(req, res){
    console.log("Leer encuestas");
    apiController.getEncuestas(req, res);//uso el controller, acá esta codeado qué tiene que hacer
});

module.exports = router;

/*app.get('/api/encuestas', (req, res) => {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://admin:pruebaapi@backapi.2a0dj.mongodb.net/backend?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const db = client.db("backend")
        const collection = db.collection("encuestas");
    collection.find({}).toArray(function(error, documents) {
            if (err) throw error;
        
            res.send(documents);
        });
    client.close();
});
})*/