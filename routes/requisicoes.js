var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);


router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



router.get('/cadastro', function(req,res,next){
    res.status(200).render('cadastroRequisicoes',{
        title: 'Cadastro de requisições'
    })
});

router.get('/listar', function(req,res,next){
    res.status(200).render('listarRequisicoes',{
        title: 'Listar requisições de alunos'
    })
});





module.exports = router;