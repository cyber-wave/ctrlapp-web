/**
 * login.js
 * Criado em: 12/10/2018
 * Autor: Davi Tabosa
 * 
 * Login feito usando JWT. Usado por dispositivos móveis.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secret = require('../../secret/secret');
//var UsuarioDAO = require('../../models/usuario/usuarioDAO');
var AlunoDAO = require('../../models/aluno/alunoDAO');
var SecretarioDAO = require('../../models/secretario/secretarioDAO');
var ProfessorDAO = require('../../models/professor/professorDAO');

router.post('/aluno', verify, (req, res, next) => {
    const login = req.body.login;
    const pw = req.body.senha;
    console.log(req.body);
    AlunoDAO.findOne({ email: login }).exec().then(usuario => {
        if (usuario.senha === pw) {
            //usuario autenticado, retorne um token novo
            var user = {
                login: usuario.login,
                email: usuario.email,
                nome: usuario.nome,
                matricula: usuario.matricula,
                userType: "aluno"
            }
            var options = {
                expiresIn: '7 days'
            }
            var token = jwt.sign(user, secret, options);
            res.status(200).json({
                status: "ok",
                token: token,
                login: usuario.login,
                email: usuario.email,
                nome: usuario.nome,
                matricula: usuario.matricula,
                userType: "aluno",
            });
        } else {
            //senha errada
            res.status(401).json({
                mensagem: "Usuario ou senha incorretos"
            })
        }
    }).catch(err => {
        //falhou
        res.status(404).json({
            mensagem: "Usuario nao existe"
        })
    });
})
///////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/professor', (req, res, next) => {
    const login = req.body.login;
    const pw = req.body.senha;
    console.log(req.body);
    ProfessorDAO.findOne({ email: login }).exec().then(usuario => {
        if (usuario.senha === pw) {
            //usuario autenticado, retorne um token novo
            var user = {
                login: usuario.login,
                email: usuario.email,
                nome: usuario.nome,
                matricula: usuario.matricula,
                topicoPrivado: usuario.topicoPrivado,
                userType: "professor"
            }
            var options = {
                expiresIn: '7 days'
            }
            var token = jwt.sign(user, secret, options);
            res.status(200).json({
                status: "ok",
                token: token,
                login: usuario.login,
                email: usuario.email,
                nome: usuario.nome,
                matricula: usuario.matricula,
                topicoPrivado: usuario.topicoPrivado,
                userType: "professor",
            });
        } else {
            //senha errada
            res.status(401).json({
                mensagem: "Usuario ou senha incorretos"
            })
        }
    }).catch(err => {
        //falhou
        res.status(404).json({
            mensagem: "Usuario nao existe"
        })
    });
})

router.post('/admin', verify, (req, res, next) => {
    const login = req.body.login;
    const pw = req.body.senha;
    SecretarioDAO.findOne({
        login: login
    }).exec()
        .then(secretario => {
            if (pw === secretario.senha) {
                //login deu certo! enviar token
                var user = {
                    login: secretario.login,
                    email: secretario.email,
                    nome: secretario.nome,
                    userType: "secretario"
                }
                var options = {
                    expiresIn: '180 days'
                }
                var token = jwt.sign(user, secret, options);
                res.status(200).json({
                    status: "ok",
                    token: token
                });
            } else {
                //senha errada
                res.status(401).json({
                    mensagem: "Usuario ou senha incorretos"
                })
            }
        })
        .catch(err => {
            //falhou
            res.status(404).json({
                mensagem: "Usuario nao existe",
                causa: err
            })
        })
})

router.all('/', (req, res, next) => {
    res.status(400).json({
        error: "Tipo de usuario nao especificado",
        message: "Envie uma requisicao POST para os seguintes caminhos: /aluno, /professor ou /admin."
    });
});

function verify(req, res, next) {
    if (req.body.login === undefined || req.body.login === "") {
        return res.status(400).json({
            error: "Requisicao mal estruturada",
            message: "Campo login nao fornecido."
        });
    } else if (req.body.senha === undefined || req.body.senha === "") {
        return res.status(400).json({
            error: "Requisicao mal estruturada",
            message: "Campo senha nao fornecido."
        });
    } else {
        //temos login e senha
        next();
    }
}
module.exports = router;