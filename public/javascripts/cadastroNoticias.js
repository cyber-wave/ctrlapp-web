$(document).ready(function () {
    $('#cadastroNoticias').addClass("active");
    $('select').formSelect();
    $('#titulo, #corpo').characterCounter();
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
                M.toast({ html: 'Notícia ' + titulo + ' enviada com sucesso!', classes: 'toastSucesso rounded', displayLength: 10000 });
                alert('Notícia ' + titulo + ' enviada com sucesso!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                M.toast({ html: 'Falha ao enviar notícia ' + titulo, classes: 'toastFalha rounded', displayLength: 10000 });
                alert('Falha ao enviar notícia ' + titulo)
            },
            complete: function () {
                $("#envioFormulario").val("Enviar");
                limparCampos("noticiasForm");
            }
        });
    }

    event.preventDefault();
});



