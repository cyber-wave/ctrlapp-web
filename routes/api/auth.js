/**
 * auth.js
 * Criado em 10/10/2018
 * Autor: Davi Tabosa
 * 
 * Middleware para autenticação de usuarios Mobile, entregando um token JSON Web Token (jwt) 
 * com informações sobre usuario como nome, tipo de usuario, etc
 */
const jwt = require('jsonwebtoken');
const secret = require('../../secret/secret');
/**
 * Verifica o token se ele é válido ou não.
 * Espera que authToken seja passado como parametro nas requisicoes.
 */
function verifyToken(req, res, next){
    const authToken = req.body.authToken || req.query.authToken;
    try{
        var decoded = jwt.verify(authToken, secret);
        req.isAuthenticated = true;
        req.currentUser = decoded;
    } catch(err){
        req.isAuthenticated = false;
        req.currentUser = undefined;
    }
    next();
}

