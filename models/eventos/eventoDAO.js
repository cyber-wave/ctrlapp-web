var connect_db = require('../mongoConnect');
var mongoose = require('mongoose');
/**
 * EventoDAO com MongoDB :(
 */

 

var EventoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    descricao: {type: String, default: "Descrição não informada"},
    horarioInicio: {type : String, required: true},
    horarioFim: {type : String, required: true},
    dia: {type : Date, required: true},
    local: {type : mongoose.Types.ObjectId, required: true} //id do laboratorio
});

var EventoModel = connect_db.model("Evento", EventoSchema);
module.exports = EventoModel;