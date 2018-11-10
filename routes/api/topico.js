var express = require('express');
var auth = require('./auth');
var router = express.Router();
var TopicoDAO = require('../../models/topico/topicoDAO');

/**
 * Pega todos os topicos
 */
router.all("/*", (req, res, next) =>{
    console.log("Request received!");
    console.log("body:");
    console.log(req.body);
    console.log("params:");
    console.log(req.params);
    console.log("query:");
    console.log(req.query);
    next();
})
router.get("/", (req,res,next) =>{
    TopicoDAO.find({}).then( data =>{
        res.status(200).json(data);
    }).catch(err => {
        console.log(`Erro na requisicao: ${err}`);
        res.sendStatus(500);
    });
});
/**
 * Pega um topico pelo id
 */
router.get("/:id", (req, res, next) =>{
    TopicoDAO.findOne({matricula: req.params.matricula}).select("nome email cpf tokenFCM matricula topicosInscritos cadastroCompleto ").exec()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(404).json({});
    });
});

/**
 * Realiza o precadastro do topico
 * Deve-se informar nome,e descricao
 * o nome do topico deve ser em letra minuscula, sem espacos
 */

router.post("/", (req, res, next) => {

    TopicoDAO.create({
        nome: req.body.nome,
        descricao: req.body.descricao    
    })
    .then(data => {
        console.log(`Mongoose retorna: ${data}`);
        res.status(201).json({
            mensagem: "Topico criado com sucesso!",
        });
    })
    .catch(err => {
        console.log(`Erro: ${err}`);
        res.status(500).json({
            mensagem: "Nao foi possivel cadastrar topico",
            motivo: err
        })
    });
});

/**
 * Atualiza o topico informando seu id
 * Não se pode alterar a matricula do topico, pode causar inconsistencias no sistema
 * @example POST "<endereco>/api/topico/376952/update"
 * @returns mensagem de sucesso
 */
router.post("/:id", (req, res, next) => {
    var modified = {};
    console.log(req.body);
    for(field in req.body){
        modified[field] = req.body[field];
    }
    TopicoDAO.findOneAndUpdate({id: req.params.id},{ $set: modified}).exec()
    .then(oldData => {
        res.status(200).json({
            mensagem: `topico id ${req.params.id} foi atualizado`
        });
    })
    .catch(err => {
        res.status(500).json({
            mensagem: `Nao foi possivel atualizar topico ${req.params.id}`,
            motivo: err 
        });
    })
})

/**
 * Deleta um topico, informando o id
 */
router.post("/:id/delete", (req, res, next) => {
    TopicoDAO.findOneAndDelete({id: req.params.id}).exec()
    .then(oldData => {
        res.status(200).json({
            mensagem: `topico com id ${req.params.id} foi removido`,
        });
    })
    .catch(err => {
        res.status(500).json({
            mensagem: `Nao foi possivel topico ${req.params.id}`,
            motivo: err 
        });
    })
});


module.exports = router;

