

function serverPorta() {
    return "https://" + window.location.hostname + ":" + window.location.port;
}


function verificaCampos(idForm, event) {

    var isValid = true;

    $("#" + idForm + ' :input[type="text"], :input[type="password"] , form textarea').each(function () {
        if ($.trim($(this).val()) == '') {
            isValid = false;
            $(this).addClass("invalid").removeClass("valid");

        } else {
            $(this).addClass("valid").removeClass("invalid");
        }
    });

    if (isValid == false) {
        M.toast({ html: 'Preencha todos os campos!', classes: 'toastFalha rounded' });
    }

    return isValid;

}


function limpaFrase(frase) {
    return frase.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
}


function limparCampos(idForm) {
    $("#" + idForm + " input").val("");
    $("#" + idForm + " textarea").val("");
    $('input, select, textarea').removeClass("valid");
    $("#" + idForm + " select").formSelect();
    $('input, textarea').characterCounter();
}


$("#altocontraste").on("keydown", function (event) {
    var tecla = event.keyCode;
    var ativado = $("#altocontraste").data("acessibilidade");


    if (tecla == 13) {
        window.toggleContrast();

        if (ativado) {
            $("#altocontraste").text("ALTO CONTRASTE DESATIVADO")
            $("#altocontraste").data("acessibilidade", false);
        } else {
            $("#altocontraste").text("ALTO CONTRASTE ATIVO")
            $("#altocontraste").data("acessibilidade", true);
        }

        event.preventDefault();
    } else if (tecla == 9) {

    }
});


$("#altocontraste").on("click", function (event) {
    var tecla = event.keyCode;
    var ativado = $("#altocontraste").data("acessibilidade");

    window.toggleContrast();

    if (ativado) {
        $("#altocontraste").text("ALTO CONTRASTE DESATIVADO")
        $("#altocontraste").data("acessibilidade", false);
    } else {
        $("#altocontraste").text("ALTO CONTRASTE ATIVO")
        $("#altocontraste").data("acessibilidade", true);
    }

    event.preventDefault();

});


function converterData(data) {
    return formataData(new Date(data));
    //return new Date(data);
}



function formataData(data) {
    data,
        dia = data.getDate().toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano = data.getFullYear(),
        //data.setHours(data.getHours() -1),
        horas = data.getHours(),
        minutos = data.getMinutes(),
        //  horas = horas % 12,
        //  horas = horas ? horas : 12, // A hora '0' deve ser '12'
        minutos = minutos < 10 ? '0' + minutos : minutos;


    return dia + "/" + mes + "/" + ano + ' ' + horas + ':' + minutos;
}




