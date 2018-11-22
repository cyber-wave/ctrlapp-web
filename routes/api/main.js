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
var evento = require('./evento');
var laboratorio = require('./laboratorio');
var secretario = require('./secretario');
var topico = require('./topico');
var professor = require('./professor');

//TODO: Require no resto dos middlewares da API.
router.use('/login', loginRouter);
router.use('/messaging', messaging);
router.use('/noticia', noticia);
router.use('/aluno', aluno);
router.use('/evento', evento);
router.use('/laboratorio', laboratorio);
router.use('/secretario', secretario);
router.use('/topico', topico);
router.use('/professor', professor);



module.exports = router;