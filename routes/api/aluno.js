var express = require('express');
var auth = require('./auth');
var router = express.Router();
var AlunoDAO = require('../../models/aluno/alunoDAO');

//pegar alunos
router.get("/", (req,res,next) =>{
    AlunoDAO.find({}).then( data =>{
        res.status(200).json(data);
    }).catch(err => {
        console.log(`Erro na requisicao: ${err}`);
        res.sendStatus(500);
    });
});

router.get("/:matricula", (req, res, next) =>{
    AlunoDAO.findOne({matricula: req.params.matricula}).select("nome matricula topicosInscritos cadastroCompleto").exec()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(404).json({});
    });
});

//cadastrar alunos

router.post("/", checarCPF, (req, res, next) => {
    AlunoDAO.create({
        nome: req.body.nome,
        matricula: req.body.matricula,
        cpf: req.body.cpf,
        cadastroCompleto: false
    })
    .then(data => {
        console.log(`Mongoose retorna: ${data}`);
        res.status(201).json({
            mensagem: "Usuario criado com sucesso!",
            aluno: {
                nome: req.body.nome,
                matricula: req.body.matricula,
                cpf: req.body.cpf,
                cadastroCompleto: false
            }
        });
    })
    .catch(err => {
        console.log(`Erro: ${err}`);
        res.status(500).json({
            mensagem: "Nao foi possivel cadastrar aluno",
            motivo: err
        })
    });
});

//update aluno
router.post("/:matricula/update", (req, res, next) => {
    var modified = {};
    console.log(req.body);
    for(field in req.body){
        modified[field] = req.body[field];
    }
    AlunoDAO.findOneAndUpdate({matricula: req.params.matricula},{ $set: modified}).exec()
    .then(oldData => {
        res.status(200).json({
            mensagem: `Aluno com matricula ${req.params.matricula} foi atualizado`
        });
    })
    .catch(err => {
        res.status(500).json({
            mensagem: `Nao foi possivel atualizar aluno ${req.params.matricula}`,
            motivo: err 
        });
    })
})

router.post("/:matricula/delete", (req, res, next) => {
    AlunoDAO.findOneAndDelete({matricula: req.params.matricula}).exec()
    .then(oldData => {
        res.status(200).json({
            mensagem: `Aluno com matricula ${req.params.matricula} foi removido`,
            aluno: oldData
        });
    })
    .catch(err => {
        res.status(500).json({
            mensagem: `Nao foi possivel aluno ${req.params.matricula}`,
            motivo: err 
        });
    })
});


module.exports = router;


function checarCPF(req, res, next){
    var cpf = req.body.cpf || req.query.cpf;
    if(cpf !== undefined && TestaCPF(cpf)){
        next();
    } else {
        res.status(400).json({
            mensagem: `CPF invalido: ${cpf}`
        });
    }
}
/**
 * Tirado de https://www.devmedia.com.br/validar-cpf-com-javascript/23916
 * @param {*} strCPF 
 */
function TestaCPF(CPF) {
    var Soma;
    var Resto;
    Soma = 0;
    strCPF = CPF.replace(/\D/g,""); //remove tudo o que nao for numero
  if (strCPF == "00000000000") return false;
     
  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
   
  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}