$(document).ready(function () {
    $('#cadastroNoticias').addClass("active");
    $('select').formSelect();
    $('input#titulo, textarea#corpo').characterCounter();
});


$("#noticiasForm").submit(function (event) {


    var titulo = $("#titulo").val();
    var corpo = $("#corpo").val();
    var topico = $("#topico").val();

    var params = {
        titulo: titulo,
        corpo: corpo,
        topico: topico
    };

    var url = serverPorta() + "/api/noticia/" + topico;


    if (verificaCampos("noticiasForm", event)) {
        $.ajax({
            url: url,
            type: 'POST',
            data: params,
            datatype: 'JSON',

            beforeSend: function () {
                $("#envioFormulario").val("Enviando...");
            },
            success: function (data) {
                M.toast({ html: 'Notícia enviada com sucesso!', classes: 'toastSucesso rounded' });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                M.toast({ html: 'Falha ao enviar notícia', classes: 'toastFalha rounded' });
            },
            complete: function () {
                $("#envioFormulario").val("Enviar");
                limparCampos();
            }
        });
    }

    event.preventDefault();
});



function limparCampos() {
    $("#titulo").val("");
    $("#corpo").val("");
    $("#topico").val("");
    $('select').formSelect();
    $('input#titulo, textarea#corpo').characterCounter();
    $('input, select, textarea').removeClass("valid");
}