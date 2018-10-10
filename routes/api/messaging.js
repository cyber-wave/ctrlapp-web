/**
 * messaging.js
 * Criado em 10/10/2018
 * Autor: Davi Tabosa
 * 
 * Parte da API responsável pelo envio de mensagens.
 */

var express = require('express');
var auth = require('./auth');
var router = express.Router();

router.use(auth);

router.post('/:topic', (req, res, next) => {
    var topic = req.query.topic || req.body.topic;
    var currentUser = req.currentUser;
    if(currentUser.type === "professor" && currentUser.username === topic){
        //envie a mensagem
    } else {
        //retorne um erro de autenticação.
        res.sendStatus(401);
    }
})



module.exports = router;