var connect_db = require('../mongoConnect');
var mongoose = require('mongoose');
/**
 * AlunoDAO com MongoDB :(
 */

 

var AlunoSchema = new mongoose.Schema({
    nome: String,
    email: String,
    cpf: String,
    matricula: {type: String, unique: true},
    tokenFCM: String, //token usado pelo FCM para enviar push notification
    topicosInscritos: {type: [String], default: [] },
    cadastroCompleto: Boolean, //indica se o aluno realizou o cadastro completo
    senha: String,
    login: {type: String, unique: true}, 
    ativo: {type: Boolean, default: true} //indica se o aluno está ativo i.e. pode fazer login ou nao
});

var AlunoModel = connect_db.model("Aluno", AlunoSchema);
module.exports = AlunoModel;