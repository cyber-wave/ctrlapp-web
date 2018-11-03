var connect_db = require('../mongoConnect');
var mongoose = require('mongoose');

/**
 * SecretarioDAO com MongoDB :(
 */

var SecretarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    login: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    email: {type: String, required: true}
})

var SecretarioDAO = connect_db.model("Secretario", SecretarioSchema);
module.exports = SecretarioDAO;