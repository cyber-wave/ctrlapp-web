var express = require('express');
var auth = require('./auth');
var router = express.Router();
var ProfessorDAO = require('../../models/professor/professorDAO');
var NotificationPusher = require('../../utils/notificationPusher');
var PresencaDAO = require('../../models/presencaProfessor/presencaProfessorDAO');

/**
 * Pega todos os professors
 */
router.all("/*", (req, res, next) =>{
    console.log("Request received!");
    console.log("body:");
    console.log(req.body);
    console.log("params:");
    console.log(req.params);
    console.log("query:");
    console.log(req.query);
    next();
})
router.get("/", (req,res,next) =>{
    ProfessorDAO.find({}).then( data =>{
        res.status(200).json({
            professores: data
        });
    }).catch(err => {
        console.log(`Erro na requisicao: ${err}`);
        res.sendStatus(500);
    });
});
/**
 * Pega um professor pela siape
 */
router.get("/:siape", (req, res, next) =>{
    ProfessorDAO.findOne({siape: req.params.siape})
    .select("nome email cpf tokenFCM siape topicosInscritos cadastroCompleto topicoPrivado").exec()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(404).json({});
    });
});

/**
 * Realiza o precadastro do professor
 * Deve-se informar nome, siape e cpf
 */

router.post("/", checarCPF, (req, res, next) => {
    ProfessorDAO.create({
        nome: req.body.nome,
        siape: req.body.siape,
        cpf: req.body.cpf,
        cadastroCompleto: false
    })
    .then(data => {
        console.log(`Mongoose retorna: ${data}`);
        res.status(201).json({
            mensagem: "Usuario criado com sucesso!",
            professor: {
                nome: req.body.nome,
                siape: req.body.siape,
                cpf: req.body.cpf,
                cadastroCompleto: false
            }
        });
    })
    .catch(err => {
        console.log(`Erro: ${err}`);
        res.status(500).json({
            mensagem: "Nao foi possivel cadastrar professor",
            motivo: err
        })
    });
});
/**
 * Atualiza o TokenFCM do professor apenas
 */
router.post("/:siape/tokenUpdate", (req, res, next) =>{
    console.log("Performing token update for " + req.params.siape);
    ProfessorDAO.findOneAndUpdate({
        siape: req.params.siape
    },{
        $set: {
            tokenFCM: req.body.fcm_token,
        }
    }).exec()
    .then(() => {
        console.log(`Token do professor ${req.params.siape} atualizada com sucesso`);
        res.status(200).json({
            mensagem: `Token do professor ${req.params.siape} atualizada com sucesso`
        });
    })
    .catch(err => {
        console.log("Nao foi possivel atualizar o token do professor " + req.params.siape);
        res.status(500).json("Nao foi possivel atualizar o token do professor.");
    })
});
/**
 * Atualiza o professor informando sua siape
 * Não se pode alterar a siape do professor, pode causar inconsistencias no sistema
 * @example POST "<endereco>/api/professor/376952/update"
 * @returns mensagem de sucesso
 */
router.post("/:siape/update", (req, res, next) => {
    var modified = {};
    console.log(req.body);
    for(field in req.body){
        modified[field] = req.body[field];
    }
    ProfessorDAO.findOneAndUpdate({siape: req.params.siape},{ $set: modified}).exec()
    .then(oldData => {
        res.status(200).json({
            mensagem: `professor com siape ${req.params.siape} foi atualizado`
        });
    })
    .catch(err => {
        res.status(500).json({
            mensagem: `Nao foi possivel atualizar professor ${req.params.siape}`,
            motivo: err 
        });
    })
})

/**
 * Deleta um professor, informando a siape
 * @example POST "<endereco>/api/professor/376952/delete"
 */
router.post("/:siape/delete", (req, res, next) => {
    ProfessorDAO.findOneAndDelete({siape: req.params.siape}).exec()
    .then(oldData => {
        res.status(200).json({
            mensagem: `professor com siape ${req.params.siape} foi removido`,
            professor: oldData
        });
    })
    .catch(err => {
        res.status(500).json({
            mensagem: `Nao foi possivel professor ${req.params.siape}`,
            motivo: err 
        });
    })
});

router.post("/:siape/checkin", (req, res, next) =>{
    ProfessorDAO.findOne({
        siape: req.params.siape
    }).exec()
    .then(professor => {
        PresencaDAO.findOne({
            professor: professor.nome
        }).then((instancia) =>{
            if(instancia === null){
                console.log("Criando nova entrada..");
                PresencaDAO.create({
                    professor: professor.nome
                }).then(() =>{
                    console.log(`Professor ${req.params.siape} entrou no bloco!`);
                }).catch(err =>{
                    console.log("Nao foi possivel fazer checkin professor no bd");
                    console.log(err);
                });    
            } else {
                console.log("instancia ja existe!");
            }
            
        }).catch(() =>{
            console.log("Criando nova entrada..");
            PresencaDAO.create({
                professor: professor.nome
            }).then(() =>{
                console.log(`Professor ${req.params.siape} entrou no bloco!`);
            }).catch(err =>{
                console.log("Nao foi possivel fazer checkin professor no bd");
                console.log(err);
            });
        });
        
        NotificationPusher.pushToTopic(professor.topicoPrivado, `${professor.nome} acabou de entrar no bloco`, professor.topicoPrivado)
        .then(() => {
            res.status(201).json({
                mensagem: `Professor ${req.params.siape} entrou no bloco!`
            })
        })
        .catch(() => {
            res.status(500).json({
                mensagem: "Não foi possivel avisar aos interessados"
            });
        });
        
    })
    .catch(err => {
        res.status(500).json({
            mensagem: "Houve um erro ao realizar checkin",
            causa: err
        });
    });

    
});

router.post("/:siape/checkout", (req, res, next) =>{
    ProfessorDAO.findOne({
        siape: req.params.siape
    }).exec()
    .then(professor => {
        PresencaDAO.findOneAndDelete({
            professor: professor.nome
        }).then(() =>{
            console.log(`Professor ${req.params.siape} saiu no bloco!`);
        }).catch(err =>{
            console.log("Nao foi possivel fazer checkout professor no bd");
            console.log(err);
        });
        NotificationPusher.pushToTopic(professor.topicoPrivado, `${professor.nome} acabou de sair do bloco`, professor.topicoPrivado)
        .then(() => {
            res.status(201).json({
                mensagem: `Professor ${req.params.siape} saiu do bloco!`
            })
        })
        .catch(() => {
            res.status(500).json({
                mensagem: "Não foi possivel avisar aos interessados"
            });
        });
        
    })
    .catch(err => {
        res.status(500).json({
            mensagem: "Houve um erro ao realizar checkout",
            causa: err
        });
    });

    router.get("/noBloco", (req, res, next) =>{
        PresencaDAO.find({}).exec()
        .then(profs => {
            if(profs == null){
                res.status(500).json({
                    mensagem: "ninguem no bloco"
                });
            } else {
                res.status(200).json({
                    professores: profs
                });
            }
            
        })
        .catch(err => {
            res.status(500).json({
                mensagem: "Nao foi possivel obter professores no bloco",
                causa: err
            });
        });
    });

    router.post("/:siape/mensagem", (req, res, next)=>{
        ProfessorDAO.findOne({
            siape: req.params.siape
        }).exec()
        .then(professor =>{
            if(professor == null){
                res.status(500).json({
                    mensagem: "professor nao existe"
                });
                return;
            }
            NotificationPusher.pushToTopic(req.body.titulo, req.body.mensagem,professor.topicoPrivado)
            .then(() =>{
                res.status(200).json({
                    mensagem: "enviado com sucesso"
                });
            })
            .catch(err =>{
                res.status(500).json({
                    mensagem: "erro ao enviar mensagem",
                    causa: err
                });
                console.log(err);
            })
        })
        .catch(err =>{
            res.status(500).json({
                mensagem: "erro ao conectar db",
                causa: err
            });
        })
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
 * @param {String} strCPF 
 * @returns se o cpf é valido ou nao
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