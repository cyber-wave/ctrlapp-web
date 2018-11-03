var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (!req.session.login) {
        res.render('login', {
            error: req.body.error
        });
    }
});

router.post('/', (req, res, next) => {
    var username = req.body.username;
    var pw = req.body.password;
    UsuarioDAO.getUsuario(username).then(u => {
        if (u.senha === pw) {
            //login com sucesso
            req.session.login = u.login;
            res.redirect('/'); //redireciona para a dashboard
        }
        else {
            //senha incorreta
            req.body.error = "Usuário ou senha incorretos!";
            next();
        }
    }).catch(err => {
        console.log(err);
        req.body.error = "Usuário não existe!";
        next();
    });

}, (req, res, next) => {
    res.render('login', {
        error: req.body.error
    });
});

module.exports = router;