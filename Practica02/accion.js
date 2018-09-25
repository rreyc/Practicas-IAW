$(function () {
    $("button").on("click",function(e){
        $(this).css({
            "display": "none"
        });
        var ajax=$.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            data:{
                results:50
            }
        });
        ajax.done(function(datos){
            for(var i=0;i<50;i++){
                $("#resultados").append("<p>"+datos["results"][i]["name"]["first"]+"</p>")
            }
        })
    });


});