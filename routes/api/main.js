/**
 * main.js
 * Criado em 10/10/2018
 * Autor: Davi Tabosa
 * 
 * Parte principal do modulo da API do projeto. 
 * Une todos os middlewares e possui a logica principal da API.
 */

var express = require('express');
var router = express.Router();
var messaging = require('./messaging');
var loginRouter = require('./login');
var noticia = require('./noticia');
var aluno = require('./aluno');

//TODO: Require no resto dos middlewares da API.
router.use('/login', loginRouter);
router.use('/messaging', messaging);
router.use('/noticia', noticia);
router.use('/aluno', aluno);



module.exports = router;