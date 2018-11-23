var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);


router.get('/cadastro', function(req,res,next){
    res.status(200).render('cadastroSecretarios',{
        title: 'Cadastro de secretários'
    })
});


router.get('/listar', function(req,res,next){

    var url = "http://" + req.headers.host + "/api/secretario/";

    $.ajax({
        url: url,
        type: 'GET',
        datatype: 'JSON',

        success: function (data) {
            console.log(data);
            res.status(200).render('listarSecretarios',{
                title: 'Listar secretários',
                secretarios: data.secretarios
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {

        },
    });

});





module.exports = router;