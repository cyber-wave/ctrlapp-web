$(document).ready(function () {
    $('#listarNoticias').addClass("active");
});


$( ".timestamp" ).each(function( index ) {
    $( this ).text(converterData($(this).text()));
});