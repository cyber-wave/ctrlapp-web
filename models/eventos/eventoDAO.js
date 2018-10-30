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
    dataInicio: {type : Date, required: true},
    dataFim: {type : Date, required: true},
    duracaoDias: Number,
    duracaoHoras: Number,
    diasDaSemana: [Number],
    recorrente: Boolean,
    local: {type : ObjectId, required: true} //id do laboratorio
});

var EventoModel = connect_db.model("Evento", EventoSchema);
module.exports = EventoModel;