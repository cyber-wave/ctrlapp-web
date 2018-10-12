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
var UsuarioDAO = require('../../models/usuario/usuarioDAO');

router.post('/', (req, res, next) =>{
    const login = req.body.login;
    const pw = req.body.password;
    console.log(req.body);
    
    UsuarioDAO.getUsuario(login).then(usuario =>{
        if(usuario.senha === pw){
            //usuario autenticado, retorne um token novo
            var user = {
                username: usuario.login,
                email: usuario.email,
                name: usuario.nome,
                matricula: usuario.matricula,
            }
            var options = {
                expiresIn: '2 days'
            }
            var token = jwt.sign(user, secret, options);
            res.status(200).json({
                status: "ok",
                token: token
            });
        }
    })
})


module.exports = router;