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
    /**
     * O token vem no header da requisição HTTP.
     * Authorization: Bearer ofghbpauiorebnuipuaw1kln241oi2n4nm1ç24n6on48j5
     */
    console.log(req.headers);
    const authToken = req.headers.authorization.split(" ")[1];
    console.log(authToken);

    try{
        var decoded = jwt.verify(authToken, secret);
     
        //asdo
        req.userData = {
            isAuthenticated: true,
            currentUser: decoded
        }
        next();
    } catch(err){
        req.userData = {
            isAuthenticated: false,
            currentUser: undefined
        }
        res.status(401).json({
            error: "Auth invalid"
        });
    }
    //next();
}

module.exports = verifyToken;

