var apiService = require('../services/api-services');
var bodyParser = require('body-parser');

exports.getEncuestas = async function (req, res)
{
    try{
        let userId = {userId: req.body.userId};
        var results = await apiService.getEncuestas(userId)
        return res.status(200).send(results);
    }catch(e){
        return res.status(500).send(e);
    }
};