$(document).ready(function () {
    $(".sidenav-trigger").hide();
});

$("#secretarioForm").submit(function (event) {

    var login = $("#login").val();
    var senha = $("#senha").val();
   

    var params = {
        login: login,
        senha: senha
    };

    var url = serverPorta() + "/api/secretario/login";


    if (verificaCampos("secretarioForm", event)) {
        $.ajax({
            url: url,
            type: 'POST',
            data: params,
            datatype: 'JSON',

            beforeSend: function () {
                $("#envioFormulario").val("Entrando...");
            },
            success: function (data) {
                //M.toast({ html: 'Logado com sucesso!', classes: 'toastSucesso rounded' });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //M.toast({ html: errorThrown, classes: 'toastFalha rounded' });
            },
            complete: function () {
                $("#secretarioForm").val("Entrar");
                limparCampos();
            }
        });
    }

    event.preventDefault();
});




function limparCampos() {
    $("#login").val("");
    $("#senha").val("");
    $("#senha, #login").removeClass("valid");
}