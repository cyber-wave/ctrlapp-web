$(document).ready(function(){
    $('#cadastroTopicos').addClass("active");
    $('input#nome, input#descricao').characterCounter();
  
});
        

$("#cadastroTopicosForm").submit(function (event) {

    var nome = limpaFrase($("#nome").val());
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
                M.toast({ html: 'Tópico ' + descricao + ' criado com sucesso!', classes: 'toastSucesso rounded', displayLength: 10000 });
                alert('Tópico ' + descricao + ' criado com sucesso!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                M.toast({ html: 'Falha ao criar tópico ' + descricao, classes: 'toastFalha rounded' });
                alert('Falha ao criar tópico ' + descricao);
            },
            complete: function () {
                $("#envioFormulario").val("Enviar");
                limparCampos("cadastroTopicosForm");
            }
        });
    }

    event.preventDefault();
});


