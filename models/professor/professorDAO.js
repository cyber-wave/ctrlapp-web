var connect_db = require('../mongoConnect');
var mongoose = require('mongoose');
/**
 * ProfessorDAO com MongoDB :(
 */

 

var ProfessorSchema = new mongoose.Schema({
    nome: {type: String, required:true},
    email: String,
    cpf: {type: String, required:true, unique: true},
    siape: {type: String, unique: true, required: true},
    tokenFCM: String, //token usado pelo FCM para enviar push notification
    topicosInscritos: {type: [String], default: [] },
    cadastroCompleto: Boolean, //indica se o Professor realizou o cadastro completo
    senha: String,
    login: {type: String, unique: true}, 
    ativo: {type: Boolean, default: true}, //indica se o Professor está ativo i.e. pode fazer login ou nao
    topicoPrivado: {type: String, unique:true},
});

var ProfessorModel = connect_db.model("Professor", ProfessorSchema);
module.exports = ProfessorModel;