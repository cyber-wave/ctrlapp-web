var express = require('express');
var router = express.Router();



router.get('/', function(req,res,next){
    res.status(200).render('requisicoesAlunos',{
        title: 'Requisição de alunos'
    })
});





module.exports = router;