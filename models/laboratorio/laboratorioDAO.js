var connect_db = require('../mongoConnect');
var mongoose = require('mongoose');
/**
 * LabDAO com MongoDB :(
 */



var LaboratorioSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true }
});

var LaboratorioModel = connect_db.model("Laboratorio", LaboratorioSchema);
module.exports = LaboratorioModel;