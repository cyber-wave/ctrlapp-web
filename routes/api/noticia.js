var express = require('express');
var auth = require('./auth');
var router = express.Router();
var MessageDAO = require('../../models/message/message');



router.post('/', (req, res, next) => {
    const titulo = req.body.titulo;    
    const corpo = req.body.corpo;
    console.log(req.body);
    
    const topico = req.query.topico || req.body.topico;
    MessageDAO.create({ 
        titulo: titulo,
        corpo: corpo,
        topico: topico
    }).then(() =>{
        //Inserido no DB com sucesso!
        res.status(201).json({
            status: "Noticia salva com sucesso",
            noticia: {
                titulo: titulo,
                corpo: corpo,
                topico: topico
            }
        });
    }).catch(err =>{
        res.status(500).json({
            status: "Erro ao salvar noticia",
            causa: err,
            noticia: {
                titulo: titulo,
                corpo: corpo,
                topico: topico
            }
        });
    });
});




module.exports = router;