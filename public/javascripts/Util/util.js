

function serverPorta(){
    return "http://" + window.location.hostname + ":" + window.location.port;
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


function limpaFrase(frase){
    return frase.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '').toLowerCase();
}


function limparCampos(idForm) {
    $("#" + idForm + " input").val("");
    $("#" + idForm + " textarea").val("");
    $('input, select, textarea').removeClass("valid");
    $("#" + idForm + " select").formSelect();
    $('input, textarea').characterCounter();
}


