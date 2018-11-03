var express = require('express');
var router = express.Router();



router.get('/', function(req,res,next){
    res.status(200).render('cadastroRequisicoes',{
        title: 'Cadastro de requisições'
    })
});





module.exports = router;