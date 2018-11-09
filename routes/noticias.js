var express = require('express');
var router = express.Router();
let ejs = require('ejs');


var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



router.get('/', function (req, res, next) {
    res.status(200).render('noticias', {
        title: 'Envio de notícias'
    })
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


router.post('/', (req, res, next) => {

});





module.exports = router;