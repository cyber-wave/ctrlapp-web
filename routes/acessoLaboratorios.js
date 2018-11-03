var express = require('express');
var router = express.Router();



router.get('/', function(req,res,next){
    res.status(200).render('acessoLaboratorios',{
        title: 'Acesso de laboratórios'
    })
});





module.exports = router;