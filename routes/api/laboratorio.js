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
    params.recorrente = req.query.recorrente || false;
    params.dataInicio = req.query.dataInicio;
    if (params.recorrente) {
        params.diasDaSemana = req.query.diasDaSemana || [0, 1, 2, 3, 4, 5, 6];
        params.dataFim = req.query.dataFim;
    } else {
        params.dataFim = req.query.dataInicio;
    }
    params.horarioInicio = req.query.horarioInicio;
    params.horarioFim = req.query.horarioFim;
    params.nome = req.query.nome;
    params.descricao = req.query.descricao;
    params.local = req.query.local;

    try {
        var colisao = checarColisao(params);
    } catch (error) {
        res.sendStatus(500);
        return;
    }

    if (colisao) {
        res.send(412).json({
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



})

/**
 * Checa se um evento colide com outro ja cadastrado no sistema
 * @param {*} params 
 */
function checarColisao(params) {
    if (params.recorrente)
        return checarColisaoRecorrente(params);

    EventoDAO.find({
        dataFim: {
            $gte: params.dataInicio
        },
        dataInicio: {
            $lte: params.dataFim
        },
        horarioInicio: {
            $gte: params.horarioFim
        },
        horarioFim: {
            $gte: params.horarioFim
        },
        diasDaSemana: {
            $in: params.diasDaSemana
        }
    }).exec()
        .then(result => {
            if (result) {
                return true;
            } else {
                return false;
            }
        })
        .catch(err => {
            throw err;
        });

}

function checarColisaoRecorrente(params){
    //pegar todos os eventos que nao colidem...
    var result1, result2;

    var query = EventoDAO.find({

        dataFim: {
            $or: [{
                $lte: params.dataFim
            }, {
                $gte: params.dataInicio
            }]
        }
        
    }).exec().then(result =>{
        result1 = result;
        
    })
    .catch(err => {
        res.sendStatus(500);
    });


    query.where('horarioFim').lt(params.horarioInicio);
    query.where('horarioFim').lt(params.horarioFim);
    query.where('horarioInicio').lt(params.horarioInicio);
    query.where('horarioInicio').lt(params.horarioInicio);
    

    query.exec().then()

}


module.exports = router;