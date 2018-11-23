$(document).ready(function(){
    $('#cadastroSecretarios').addClass("active");
    $('input#login').characterCounter();
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
                M.toast({ html: 'Secretário cadastrado com sucesso!', classes: 'toastSucesso rounded' });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                M.toast({ html: 'Falha ao cadastrar secretários', classes: 'toastFalha rounded' });
            },
            complete: function () {
                $("#envioFormulario").val("Enviar");
                limparCampos("cadastroSecretariosForm");
            }
        });
    }

    event.preventDefault();
});




