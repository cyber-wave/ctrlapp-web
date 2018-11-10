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
var MessageDAO = require('../../models/message/message');
var AlunoDAO = require('../../models/aluno/alunoDAO');
var router = express.Router();


//router.use(auth);

router.post('/:topic', (req, res, next) => {
    var topic = req.params.topic;
    var currentUser = req.userData.currentUser;
    console.log(`User ${currentUser.name} tried to send message to topic ${topic}`);
    
    res.status(201).json({
        message: `User ${currentUser.name} tried to send message to topic ${topic}`
    });

    //TODO: Apenas professores e alunos especiais podem realizar mensagens a topicos
});

//envia uma mensagem para um aluno, com seu fcm token...
router.post("/aluno/:matricula", (req, res, next) => {
    const titulo = req.body.titulo;
    const mensagem = req.body.mensagem;
    AlunoDAO.findOne({
        matricula: req.params.matricula
    }).exec()
    .then(aluno => {
        const theToken = aluno.tokenFCM;

        firebase.messaging().send({
            notification: {
                body: mensagem,
                title: titulo,
            },
            token: theToken
        }).then(() => {
            res.status(200).json({
                mensagem: `Mensagem para aluno ${req.params.matricula} enviado com sucesso`
            });
        }).catch((err) => {
            console.error(err);
            res.status(500).json({
                mensagem: `Erro ao enviar mensagem: firebase`,
                motivo: err
            })
        })
    })    
    .catch(err => {
        res.status(500).json({
            mensagem: `Erro ao enviar mensagem: mongo`,
            motivo: err
        });
    });
});

router.post('/:topic', (req, res, next) => {
    var topic = req.params.topic || req.body.topic;
    var titulo = req.body.titulo;
    var corpo = req.body.corpo;
    MessageDAO.create({
        titulo: titulo,
        corpo: corpo,
        topico: topic,
    })

    firebase.messaging().send({
        android: {
            collapseKey: topic
        },
        notification: {
            body: corpo,
            title: titulo,
        },
        topic: topic
    }).then(() => {
        console.log("Enviada mensagem para topico: " + topic);
        res.sendStatus(201);
    }).catch(e => {
        console.log("Erro ao enviar mensagem: " + e);
        res.sendStatus(500);
    })
});



module.exports = router;