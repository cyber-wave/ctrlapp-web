var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);


router.get('/envio', function (req, res, next) {


    var url = "http://" + req.headers.host + "/api/topico/";

    $.ajax({
        url: url,
        type: 'GET',
        datatype: 'JSON',

        success: function (data) {
            //console.log(data);
            res.status(200).render('cadastroNoticias', {
                title: 'Envio de notícias',
                topicos: data.topicos
            })
        },
        error: function (error) {

        },
    });

});

router.get('/listar', function (req, res, next) {


    var url = "http://" + req.headers.host + "/api/noticia/";

    $.ajax({
        url: url,
        type: 'GET',
        datatype: 'JSON',

        success: function (data) {
            //console.log(data);
            res.status(200).render('listarNoticias', {
                title: 'Listar notícias',
                noticias: data.noticias
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {

        },
    });



});





module.exports = router;