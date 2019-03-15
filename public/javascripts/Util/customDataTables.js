$(document).ready( function () {

    iniciaDataTables();
    $("select.input-sm").formSelect();
} );


function iniciaDataTables(){
    $('#materialize-table').DataTable({
        responsive: true,
        retrieve: true,
        "language": {
            "sEmptyTable":   "Nenhum registro encontrado",
            "sProcessing":   "A processar...",
            "sLengthMenu":   "Mostrar _MENU_ registos",
            "sZeroRecords":  "Não foram encontrados resultados",
            "sInfo":         "Mostrando de _START_ até _END_ de _TOTAL_ registos",
            "sInfoEmpty":    "Mostrando de 0 até 0 de 0 registos",
            "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
            "sInfoPostFix":  "",
            "sSearch":       "Procurar:",
            "sUrl":          "",
            "oPaginate": {
                "sFirst":    "Primeiro",
                "sPrevious": "Anterior",
                "sNext":     "Seguinte",
                "sLast":     "Último"
            },
            "oAria": {
                "sSortAscending":  ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        },
        "lengthMenu": [[5, 10, 15, 20, -1], [5, 10, 15, 20, "Todos"]],
        "dom": "<'row'<'col l2 m6'l><'col l4 m6 right'f>><'row't><'row'<'col l6 m6'i><'col l6 m6 right'p>>"
    });
}



