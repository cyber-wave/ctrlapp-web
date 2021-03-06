var express = require('express');
var auth = require('./auth');
var router = express.Router();
var SecretarioDAO = require('../../models/secretario/secretarioDAO');

/**
 * Pega um secretario informando o login
 */

router.get('/', (req, res, next) => {
    SecretarioDAO.find({}).exec()
        .then(data => {
            res.status(200).json({
                secretarios: data
            });
        })
        .catch(err => {
            res.status(500).json({
                mensagem: "Erro ao obter secretarios",
                causa: err
            })
        })
})
router.get("/:login", (req, res, next) => {
    const login = req.params.login;
    var dbResult = SecretarioDAO.findOne({
        login: login
    }).exec();

    dbResult.then(secretario => {
        res.status(200).json(secretario);
    })
    dbResult.catch(err => {
        res.status(500).json({
            mensagem: "Erro ao obter secretario",
            causa: err
        });
    })
});


/* Login do secretário */
router.post('/login', (req, res, next) => {
    var login = req.body.login;
    var senha = req.body.senha;

    var dbResult = SecretarioDAO.findOne({
        login: login
    }).exec();

    dbResult.then(secretario => {

        if (secretario === null) {
            res.status(500).json({
                mensagem: "Secretário não existe!"
            });
        } else if (secretario.login === login && secretario.senha === senha) {
            req.session.secretario = secretario.login;
            res.redirect('/'); //redireciona para a dashboard
        } else {
            res.status(500).json({
                mensagem: "Secretário não existe!"
            });
        }
    })
    dbResult.catch(err => {
        console.log(err);
        //req.body.error = "Secretário não existe!";
        next();
    });

}, (req, res, next) => {
    res.render('login', {
        title: "Login do secretário"
    });
});


/* Logout do secretário */
router.get('/logout', (req, res, next) => {

    req.session.secretario = null;
    res.render('login', {
        title: "Login do secretário"
    });

});


/**
 * Cadastra um novo secretario
 */
router.post("/", (req, res, next) => {

    const nome = req.body.nome;
    const email = req.body.email;
    const login = req.body.login;
    const senha = req.body.senha;

    SecretarioDAO.create({
        nome: nome,
        email: email,
        login: login,
        senha: senha
    })
        .then(() => {
            res.status(201).json({
                mensagem: "Secretario cadastrado com sucesso"
            });
        })
        .catch(err => {
            res.status(500).json({
                mensagem: "Erro ao cadastrar secretario",
                causa: err
            });
        });
});

/**
 * Atualiza cadastro do secretario
 */
router.put("/:login", (req, res, next) => {
    var modified = {};

    for (field in req.body) {
        modified[field] = req.body[field];
    }
    SecretarioDAO.findOneAndUpdate({
        login: req.params.login
    }, {
            $set: modified
        }).exec()
        .then(() => {
            res.status(200).json({
                mensagem: "Secretario ${req.params.login} atualizado com sucesso"
            });
        })
        .catch(err => {
            res.status(500).json({
                mensagem: "Erro ao atualizar secretario",
                causa: err
            });
        });
});
/**
 * Remove um secretario do banco de dados, informando login
 */
router.delete('/:login', (req, res, next) => {
    SecretarioDAO.findOneAndDelete({
        login: req.params.login
    })
        .exec()
        .then(() => {
            res.status(200).json({
                mensagem: "Secretario ${req.params.login} removido com sucesso"
            });
        })
        .catch(err => {
            res.status(500).json({
                mensagem: "Erro ao remover secretario",
                causa: err
            });
        })
})

module.exports = router;
