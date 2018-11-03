$(document).ready(function(){
    $('#novaNoticia').addClass("active");
    $('select').formSelect();
    $('input#titulo, textarea#corpo').characterCounter();
});
        