var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);


router.get('/listar', function (req, res, next) {

    var url = "http://" + req.headers.host + "/api/professor/";

    $.ajax({
        url: url,
        type: 'GET',
        datatype: 'JSON',

        success: function (data) {
            //console.log(data);
            res.status(200).render('listarProfessores', {
                title: 'Listar professores',
                professores: data.professores
            })
        },
        error: function (error) {

        },
    });

});








module.exports = router;