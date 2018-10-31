var express = require('express');
var auth = require('./auth');
var router = express.Router();
var EventoDAO = require('../../models/eventos/eventoDAO');

//retorna todos os eventos
router.get('/', (req, res, next) => {
    var parametros = {};
    console.log(req.body);
    for (field in req.body) {
        parametros[field] = req.body[field];
    }
    EventoDAO.find(parametros).exec()
        .then(eventos => {
            res.status(200).json(eventos);
        })
        .catch(err => {
            res.status(500).json({
                mensagem: "Nao foi possivel obter eventos",
                causa: err
            });
        });
});

router.post('/:labId', (req, res, next) => {
    var params = {};
    params.dia = req.body.dia;
    params.horarioInicio = req.body.horarioInicio;
    params.horarioFim = req.body.horarioFim;
    params.nome = req.body.nome;
    params.descricao = req.body.descricao;
    params.local = req.params.labId;
    console.log(params);


    checarColisao(params).then(eventos => {
        if (eventos.length > 0) {
            //ja existem eventos cadastrados...
            res.status(412).json({
                mensagem: `Existem eventos ja planejados para esta data e hora.`
            });
        } else {
            EventoDAO.create(params)
                .then(() => {
                    res.status(201).json({
                        mensagem: "Evento criado com sucesso"
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        mensagem: "Nao foi possivel inserir este evento",
                        causa: err
                    });
                });
        }
    }).catch(err => {
        console.log(err);

        res.status(500).json({ mensagem: "Erro ao registrar evento", causa: err });
    });
})

/**
 * Checa se um evento colide com outro ja cadastrado no sistema
 * @param {*} params 
 */
function checarColisao(params) {
    return EventoDAO.find({
        dia: params.dia,
    }).or([
        {
            $and: [
                { horarioInicio: { $gte: params.horarioInicio } },
                { horarioInicio: { $lte: params.horarioFim } }
            ]
        }, 
        {
            $and: [
                { horarioFim: { $gte: params.horarioInicio } },
                { horarioFim: { $lte: params.horarioFim } }
            ]
        }
    ]).exec()
}


module.exports = router;