var express = require('express');
var router = express.Router();

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);


router.get('/', function (req, res, next) {
    res.status(200).render('noticias', {
        title: 'Envio de notícias'
    })
});


router.post('/', (req, res, next) => {

    const titulo = req.body.titulo;
    const corpo = req.body.corpo;
    const topico = req.body.topico;

    var params = {
        titulo: titulo,
        corpo: corpo,
        topico: topico
    };

    var url = "http://localhost:3000/messaging/" + topico;
    console.log(url);

        $.ajax({
            url: url,
            type: 'POST',
            data: params,
            datatype: 'JSON',
            success: function (data) { 
               console.log("Deu muito bom!");
            },
            error: function (jqXHR, textStatus, errorThrown) { 
               console.log("Deu muito ruim -" + errorThrown);
            },
            done: function(){
                console.log("Terminei o AJAX");
            }
        });

});





module.exports = router;