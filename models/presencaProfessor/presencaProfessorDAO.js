var connect_db = require('../mongoConnect');
var mongoose = require('mongoose');
/**
 * ProfessorDAO com MongoDB :(
 */

 

var PresencaProfessorSchema = new mongoose.Schema({
    professor: {type: String, required: true}
});

var PresencaProfessorModel = connect_db.model("PresencaProfessor", PresencaProfessorSchema, "presencaprofessors");
module.exports = PresencaProfessorModel;