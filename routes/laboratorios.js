var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);


router.get('/listar', function(req,res,next){
    res.status(200).render('listarLaboratorios',{
        title: 'Acesso de laboratórios'
    })
});





module.exports = router;