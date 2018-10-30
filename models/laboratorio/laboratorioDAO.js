var connect_db = require('../mongoConnect');
var mongoose = require('mongoose');
/**
 * LabDAO com MongoDB :(
 */

 

var LaboratorioSchema = new mongoose.Schema({
    nome: String
});

var LaboratorioModel = connect_db.model("Laboratorio", LaboratorioSchema);
module.exports = LaboratorioModel;