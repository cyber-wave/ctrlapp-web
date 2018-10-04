var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');

router.get('/', verificarLogin);
router.post('/', verificarLogin);

function verificarLogin(req, res, next){
    if(req.session.login){
        next('route');
    } else{
        req.session.destroy();
        res.redirect('/');
    }
}

router.get('/', function(req,res,next){
    res.status(200).render('noticias',{
        title: "Envio de notícias"
    })
});



router.post('/', function(req,res,next){
    var dados = req.body;
    var client = mqtt.connect("",{ host: 'localhost', port: 1883 });
    
    client.on('connect', () => {
        console.log("conectado ao Mosca!");
        client.publish('hello', 'hello world!');
        res.status(200).send(dados);
    });
    client.on('error', err =>{
        console.log(err);
        res.status(500);
    });

    
});

module.exports = router;