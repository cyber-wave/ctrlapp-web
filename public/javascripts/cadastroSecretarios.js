$(document).ready(function(){
    $('#cadastroSecretarios').addClass("active");
    $('#login').characterCounter();
});
        



$("#cadastroSecretariosForm").submit(function (event) {

    var nome = $("#nome").val();
    var email = $("#email").val();
    var login = $("#login").val();
    var senha = $("#senha").val();
   

    var params = {
        nome: nome,
        email: email,
        login: login,
        senha: senha
    };

    var url = serverPorta() + "/api/secretario/";


    if (verificaCampos("cadastroSecretariosForm", event)) {
        $.ajax({
            url: url,
            type: 'POST',
            data: params,
            datatype: 'JSON',

            beforeSend: function () {
                $("#envioFormulario").val("Enviando...");
            },
            success: function (data) {
                M.toast({ html: 'Secretário '+ nome +' cadastrado com sucesso!', classes: 'toastSucesso rounded', displayLength: 10000 });
                alert('Secretário '+ nome +' cadastrado com sucesso!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                M.toast({ html: 'Falha ao cadastrar secretário ' + nome, classes: 'toastFalha rounded', displayLength: 10000 });
                alert('Falha ao cadastrar secretário ' + nome);
            },
            complete: function () {
                $("#envioFormulario").val("Enviar");
                limparCampos("cadastroSecretariosForm");
            }
        });
    }

    event.preventDefault();
});




