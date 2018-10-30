/**
 * message.js
 * Criado em 10/10/2018
 * Autor: Davi Tabosa
 * 
 * 
 * Classe de modelo para Message.
 */

var mongoose = require('mongoose');
var connect_db = require('../mongoConnect');

var MessageSchema = new mongoose.Schema({
    titulo: String,
    corpo: String, 
    topico: String,
    img: String, // base64 ou um caqminho para diretorio??
    timestamp: {type: Date, default: Date.now()}
},);

var MessageModel = connect_db.model("Noticia", MessageSchema);

module.exports = MessageModel;