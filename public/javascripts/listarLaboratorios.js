
var idLab;
var nomeLab;

$(document).ready(function () {

    $('#acessoLaboratorios').addClass("active");
    $('#nomePessoa, #matricula, #telefone').characterCounter();

});


$("#modalLab").modal({
    onOpenStart: function () {
        
        $("#tituloModal").text("Acessos ao " + nomeLab);

        var url = serverPorta() + "/controle/" + idLab;

        $.ajax({
            url: url,
            type: 'GET',
            datatype: 'JSON',
    
            success: function (data) {

                console.log(data);

                if ( $.fn.dataTable.isDataTable( '#materialize-table' ) ) {
                    table = $('#materialize-table').DataTable();
                }

                table.destroy();
        

                $('#materialize-table').DataTable( {
                    "ajax": data.acessos,
                    "dataSrc": "",
                    "columns": [
                        { "data.acessos": "nomePessoa" },
                        { "data.acessos": "matricula" },
                        { "data.acessos": "telefone" },
                        { "data.acessos": "timestamp" }
                    ]
                } );

        


            },
            error: function (error) {
                console.log(error);
            },
        });
    }, 
    onOpenEnd: function () {
        //iniciaDataTables();
        
    },
    onCloseEnd: function () {
        limparCampos("modalForm");
    }
});


$(".accessLab").click(function () {
    idLab = $(this).data("id");
    nomeLab = $(this).data("nome");
});

//       <% if (this.acessos) { %>

$("#modalForm").submit(function (event) {

    var nomePessoa = $("#nomePessoa").val();
    var matricula = $("#matricula").val();
    var telefone = $("#telefone").val();

    var params = {
        nomePessoa: nomePessoa,
        matricula: matricula,
        telefone: telefone
    };

    var url = serverPorta() + "/controle/" + idLab;


    if (verificaCampos("modalForm", event)) {
        $.ajax({
            url: url,
            type: 'POST',
            data: params,
            datatype: 'JSON',

            beforeSend: function () {
                $("#envioFormulario").val("Adicionando...");
            },
            success: function (data) {
                M.toast({ html: 'Acesso para o aluno ' + nomePessoa + ' realizado com sucesso!', classes: 'toastSucesso rounded', displayLength: 10000 });
                alert('Acesso para o aluno ' + nomePessoa + ' realizado com sucesso!');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                M.toast({ html: 'Falha ao ceder acesso para o aluno ' + nomePessoa, classes: 'toastFalha rounded', displayLength: 10000 });
                alert('Falha ao ceder acesso para o aluno ' + nomePessoa)
            },
            complete: function () {
                $("#envioFormulario").val("Adicionar acesso");
                limparCampos("modalForm");
            }
        });
    }

    event.preventDefault();
});






