$(document).ready(function(){
    $('#cadastroTopicos').addClass("active");
    $('input#nome, input#descricao').characterCounter();
});
        



$("#cadastroTopicosForm").submit(function (event) {

    var nome = $("#nome").val();
    var descricao = $("#descricao").val();
   

    var params = {
        nome: nome,
        descricao: descricao,
    };

    var url = serverPorta() + "/api/topico/";


    if (verificaCampos("cadastroTopicosForm", event)) {
        $.ajax({
            url: url,
            type: 'POST',
            data: params,
            datatype: 'JSON',

            beforeSend: function () {
                $("#envioFormulario").val("Enviando...");
            },
            success: function (data) {
                M.toast({ html: 'Tópico criado com sucesso!', classes: 'toastSucesso rounded' });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                M.toast({ html: 'Falha ao criar tópico', classes: 'toastFalha rounded' });
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
    $("#descricao").val("");
    $("#nome").val("");
    $('input').removeClass("valid");
}