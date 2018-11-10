var express = require('express');
var auth = require('./auth');
var router = express.Router();
var MessageDAO = require('../../models/message/message');
var NotificationPusher = require('../../utils/notificationPusher');



router.post('/:topico', (req, res, next) => {
    const titulo = req.body.titulo;    
    const corpo = req.body.corpo;
    console.log(req.body);
    
    const topico = req.params.topico || req.body.topico;
    MessageDAO.create({ 
        titulo: titulo,
        corpo: corpo,
        topico: topico
    }).then((data) =>{
        //Inserido no DB com sucesso!
        NotificationPusher.pushToTopic(titulo, corpo, topico)
        .then(() =>{
            console.log(`Enviado mensagem para topico ${topico}`);
        })
        .catch((err) =>{
            console.log(`Nao foi possivel enviar mensagem para topico ${topico}`);
            console.error(err);
        });
        res.status(201).json({
            status: "Noticia salva com sucesso",
            noticia: data
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

//mostra "todas" as noticias cadastradas
router.get('/', (req, res, next) => {
    //numero de documentos para ignorar antes de retornar
    var start = req.query.inicio || 0;
    var limit = req.query.limite || 30; //numero de docs para retornar
    MessageDAO.find({}).sort({timestamp: -1}).skip(start).limit(limit).exec()
    .then(data => {
        res.status(200).json({
            noticias: data
        });
    })
    .catch(err => {
        res.status(500).json({
            mensagem: "Erro ao listar noticias",
            causa: err
        });
    });
});

//retorna apenas uma unica noticia
router.get('/:id', (req, res, next) =>{
    const id = req.params.id;
    MessageDAO.findById(id).exec()
    .then( noticia =>{
        res.status(200).json(noticia);
    })
    .catch( err => {
        res.status(500).json({
            mensagem: "Erro ao ler noticia",
            causa: err
        });
    });
});

//remove uma noticia
router.post('/:id/delete', (req, res, next) => {
    const id = req.params.id;
    MessageDAO.findByIdAndDelete(id).then( () => {
        res.status(200).json({
            mensagem: `Noticia ${id} deletada com sucesso`
        });
    })
    .catch( err => {
        res.status(500).json({
            mensagem: `Nao foi possivel deletar noticia ${id}`,
            causa: err
        });
    });
})


module.exports = router;