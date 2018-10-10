/**
 * message.js
 * Criado em 10/10/2018
 * Autor: Davi Tabosa
 * 
 * 
 * Classe de modelo para Message.
 */

 class Message{
     constructor(title, body){
        var _title = title;
        var _body = body;
        this.getTitle = function(){ return _title; }
        this.getBody = function(){ return _body; }

        this.setTitle = function(title){
            _title = title;
        }

        this.setBody = function(body){
            _body = body;
        }
     }


 }