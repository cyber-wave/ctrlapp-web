var express = require('express');
var router = express.Router();
var ControleDAO = require('../models/controle/controleDAO');




router.get("/:idLab", (req,res,next) =>{
    ControleDAO.find({local: req.params.idLab}).then( data =>{
        res.status(200).json({
            acessos: data
        });
    }).catch(err => {
        console.log(`Erro na requisicao: ${err}`);
        res.sendStatus(500);
    });
});


router.post('/:idLab', (req, res, next) => {
    ControleDAO.create({
        nomePessoa: req.body.nomePessoa,
        matricula: req.body.matricula,
        telefone: req.body.telefone,
        local: req.params.idLab

    }).then(() => {
        res.status(201).json({
            mensagem: "Acesso feito com sucesso"
        });
    }).catch( err => {
        res.status(400).json({
            mensagem: "Erro ao inserir acesso",
            causa: err
        });
    })
})



module.exports = router;