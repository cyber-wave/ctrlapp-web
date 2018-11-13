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



router.get('/', function (req, res, next) {


    var url = "http://" + req.headers.host + "/api/topico/";

    $.ajax({
        url: url,
        type: 'GET',
        datatype: 'JSON',

        success: function (data) {
            console.log(data);
            res.status(200).render('cadastroNoticias', {
                title: 'Envio de notícias',
                topicos: data.topicos
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {

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
            console.log(data);
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