/**
 * message.js
 * Criado em 10/11/2018
 * Autor: Davi Tabosa
 * 
 * 
 * Classe de modelo para Message.
 */

var mongoose = require('mongoose');
var connect_db = require('../mongoConnect');

var TopicoSchema = new mongoose.Schema({
    nome: {required: true, unique: true, type: String},
    descricao: {required: true, type: String}
});

var TopicoModel = connect_db.model("Topico", TopicoSchema);

module.exports = TopicoModel;