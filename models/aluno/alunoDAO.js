var connect_db = require('../mongoConnect');
var mongoose = require('mongoose');
/**
 * AlunoDAO com MongoDB :(
 */

 

var AlunoSchema = new mongoose.Schema({
    nome: String,
    email: String,
    cpf: String,
    matricula: String,
    tokenFCM: String, //token usado pelo FCM para enviar push notification
    topicosInscritos: [String],
    cadastroCompleto: Boolean, //indica se o aluno realizou o cadastro completo
    senha: String, 
    ativo: Boolean //indica se o aluno está ativo i.e. pode fazer login ou nao
});

var AlunoModel = connect_db.model("Aluno", AlunoSchema);