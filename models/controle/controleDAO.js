var connect_db = require('../mongoConnect');
var mongoose = require('mongoose');
/**
 * Controle dos laboratórios com MongoDB :(
 */



var ControleSchema = new mongoose.Schema({
    local: {type : mongoose.Types.ObjectId, required: true}, //id do laboratorio
    nomePessoa: { type: String, required: true},
    matricula: { type: String, required: true},
    telefone: { type: String, required: true},
    timestamp: {type: Date, default: Date.now()}
});

var ControleModel = connect_db.model("Controle", ControleSchema);
module.exports = ControleModel;