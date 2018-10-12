var pgp = require("pg-promise")();
var db = pgp('postgres://ctrlapp:cyberwave@localhost:5432/ctrlapp');
var Usuario = require('./usuario');

class UsuarioDAO{
    /**
     * Pega todos os usuários do sistema
     * @param {Function} success Chamado quando recebe alguma informação
     * @param {Function} failure Chamado quando há um erro
     */
    static getTodos(success, failure){
        db.any("SELECT * FROM usuario")
        .then(data => {
            success(data);
        })
        .catch(err => {
            failure(err);
        });
    }
    /**
     * Função que pega um usuário do banco
     * @param {String} login Login do usuário cadastrado
     * @returns Uma promise com um usuário pendente. Modelo no banco de dados.
     */
     static async getUsuario(login){
        try{
            var data = await db.one("SELECT * FROM usuario NATURAL JOIN aluno WHERE usuario.login = $1",[login]);
            if(!data){
                //o usuario nao existe
                throw new Error("Usuário não existe.");
            }
            return data;
        } catch (error){
            console.log(`Erro! ${error}`);
            return undefined;
        }
        
        
        
        
    }
}

module.exports = UsuarioDAO;