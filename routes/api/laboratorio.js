var express = require('express');
var auth = require('./auth');
var router = express.Router();
var LabDAO = require('../../models/laboratorio/laboratorioDAO');

router.get('/', (req, res, next) => {
    LabDAO.find({}).exec().then(labs => {
        res.status(200).json(labs);
    }).catch(err =>{
        res.status(500).json({
            mensagem: "Erro ao consultar laboratorio",
            causa: err
        });
    });
});

router.post('/', (req, res, next) => {
    LabDAO.create({
        nome: req.body.nome
    }).then(() => {
        res.status(201).json({
            mensagem: "Laboratorio cadastrado com sucesso"
        });
    }).catch( err => {
        res.status(400).json({
            mensagem: "Erro ao inserir laboratorio",
            causa: err
        });
    })
})


module.exports = router;