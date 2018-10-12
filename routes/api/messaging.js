/**
 * messaging.js
 * Criado em 10/10/2018
 * Autor: Davi Tabosa
 * 
 * Parte da API responsável pelo envio de mensagens.
 */

var express = require('express');
var auth = require('./auth');
var firebase = require('../../secret/firebase');
var router = express.Router();


//router.use(auth);

router.post('/:topic', auth, (req, res, next) => {
    var topic = req.params.topic;
    var currentUser = req.userData.currentUser;
    console.log(`User ${currentUser.name} tried to send message to topic ${topic}`);
    res.status(201).json({
        message: `User ${currentUser.nome} tried to send message to topic ${topic}`
    });
});

/*router.post('/:topic', (req, res, next) => {
    var topic = req.query.topic || req.body.topic;
    var message = req.message;
    firebase.messaging().send({
        android: {
            collapseKey: topic,
            ttl
        },
        notification: {
            body: message.body,
            title: message.title
        },
        topic: topic
    }).then(() => {
        console.log("Enviada mensagem para topico: " + topic);
        res.sendStatus(201);
    }).catch(e => {
        console.log("Erro ao enviar mensagem: " + e);
        res.sendStatus(500);
    })
})*/



module.exports = router;