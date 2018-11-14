var connect_db = require('../mongoConnect');
var mongoose = require('mongoose');
/**
 * Controle dos laboratórios com MongoDB :(
 */



var ControleSchema = new mongoose.Schema({
    dia: {type : Date, required: true},
    local: {type : mongoose.Types.ObjectId, required: true}, //id do laboratorio
    nomePessoa: { type: String, required: true},
    matricula: { type: String, required: true},
    telefone: { type: String, required: true},
    horarioInicio: {type : String, required: true},
    horarioFim: {type : String, required: true}
});

var ControleModel = connect_db.model("Controle", ControleSchema);
module.exports = ControleModel;