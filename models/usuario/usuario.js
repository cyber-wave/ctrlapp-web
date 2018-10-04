
"use strict";
class Usuario {
    constructor(login, email, senha, msg_id){
        this.login = login; 
        this.email = email;
        this.senha = senha;
        this.msg_id = msg_id;
    }

    get login(){
        return this._login;
    }
    get senha(){
        return this._senha;
    }
    get email(){
        return this._email;
    }
    get msg_id(){
        return this._msg_id;
    }

    set login(login){
        this._login = login;
    }
    set senha(senha){
        this._senha = senha;
    }
    set email(email){
        this._email = email;
    }
    set msg_id(msg_id){
        this._msg_id = msg_id;
    }
};

module.exports = Usuario;
///USUARIO DAO
