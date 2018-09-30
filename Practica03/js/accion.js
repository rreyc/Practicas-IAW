    $(function () {
        $("#boton").on("click", function (e) {

            var jqxhr = $.ajax({
                url: 'https://randomuser.me/api/',
                method: "get",
                dataType: "json",
                data: {results: 50}
            });

            jqxhr
                .done(function (data) {
                    $("#boton").hide();
                    var listaUsuarios = data["results"];
                    var texto = "";
                //    var contador=0;  Utilizado al principio para poner un id a cada fila

                    for (usuario of listaUsuarios) {
                        var nombre = usuario["name"]["first"];
                        var apellido = usuario["name"]["last"];
                        var email = usuario["email"];
                        var localidad = usuario["location"]["city"];
                        var estado = usuario["location"]["state"];
                        var cp = usuario["location"]["postcode"];
                        var calle = usuario["location"]["street"];
                        var imagen = usuario["picture"]["large"];
                        var seed = usuario["login"]["md5"];  // Usado como  ID debido a que no hay dos hash iguales
                        texto="<div class='fila' id='"+seed+"'>";
                            texto+="<figure>";
                                texto += "<img src='" + imagen + "'>";
                            texto+="</figure>";
                            texto+="<div class='texto'>";
                                texto += "<p>"+nombre + " " + apellido + "</p>";
                                texto += "<p>"+email + "</p>";
                                texto += "<p>"+calle + ", " + cp + ", " + localidad + " (" + estado + ")</p>";
                            texto += "</div>";
                        texto+="</div>";
                    //    contador++;  Usado para sumar 1 a la variable contador
                        $("#contenido").append(texto);

                    }
                    $(".fila").on("click",function (e) {
                        var id = $(this).attr('id');  //Con esto saco el ID de la fila donde hemos hecho click
                       /* $(this).css({
                            "display": "none"  //Utilizado al principio para borrar cada fila
                        }); */
                        var jqxhr2=$.ajax({
                            "url": 'https://randomuser.me/api/',
                            "dataType": 'json',
                            "data":{
                                "results":1
                            }
                        });
                        jqxhr2.done(function(datos2){
                            var listaUsuarios2 = datos2["results"];
                            for (usuario2 of listaUsuarios2) {
                                var nombre = usuario2["name"]["first"];
                                var apellido = usuario2["name"]["last"];
                                var email = usuario2["email"];
                                var localidad = usuario2["location"]["city"]
                                var estado = usuario2["location"]["state"]
                                var cp = usuario2["location"]["postcode"]
                                var calle = usuario2["location"]["street"]
                                var imagen = usuario2["picture"]["large"];
                                var seed = usuario2["login"]["md5"]
                                texto="<div class='fila' id='"+seed+"'>";
                                texto+="<figure>";
                                texto += "<img src='" + imagen + "'>";
                                texto+="</figure>";
                                texto+="<div class='texto'>";
                                texto += "<p>"+nombre + " " + apellido + "</p>";
                                texto += "<p>"+email + "</p>";
                                texto += "<p>"+calle + ", " + cp + ", " + localidad + " (" + estado + ")</p>";
                                texto += "</div>";
                                texto+="</div>";
                                $("#"+id).after(texto);  //Usado para insertar debajo de cada fila cuyo id en el DOM esta guardo en la variable anterior
                                $("#"+id).remove();      //Usado para eliminar el elemento cuyo id en el DOM esta guardo en la variable
                            }                            //Con estas dos funciones lo que conseguimos es escribir un elemento nuevo y al borrar el siguinte se queda en la misma posicion y sigue con el CSS correspondiente.
                        })
                    });
                })
                .fail(function (jxhr, textStatus) {
                    console.log(textStatus);
                })
        })

    })