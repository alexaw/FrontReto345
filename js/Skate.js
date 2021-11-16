//Relacion
function autoTraeCategory(){
    console.log("Se esta ejecuatando")
    $.ajax({
        url:"http://150.230.91.74:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            });
        }
    })
}

function traerInformacionSkate() {
    $.ajax({
        url:"http://150.230.91.74:8080/api/Skate/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaSkate(response);
        }
    });
}

function pintarRespuestaSkate(response){

    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>NOMBRE</th><th>BRAND</th><th>YEAR</th><th>DESCRIPCION</th><th>NOMBRE CATEGORIA</th><th colspan='3'></th></tr></thead>";
    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].brand + "</td>";
        myTable+="<td>" + response[i].year + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+="<td><button class = 'ui green button' onclick='actualizarInformacionSkate("+response[i].id+")'>Actualizar</button>";
        myTable+="<td><button class = 'ui yellow button' onclick='cargarDatosSkate("+response[i].id+")'>Editar</button>";
        myTable+="<td><button class = 'ui red button' onclick='borrarSkate("+response[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaSkate").html(myTable);
}

function cargarDatosSkate(id) {
    $.ajax({
        dataType: 'json',
        url:"http://150.230.91.74:8080/api/Skate/"+id,
        type: 'GET',
        success: function (response) {
            console.log(response);
            var item = response;
            $("#Skname").val(item.name);
            $("#Skbrand").val(item.brand);
            $("#Skyear").val(item.year);
            $("#Skdescription").val(item.description);
            $("#select-category").val(item.category.id)
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error desconocido")
        }
    });
}

function guardarInformacionSkate() {

    if($("#Skname").val().length == 0 || $("#Skbrand").val().length == 0 || $("#Skyear").val().length == 0 || $("#Skdescription").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{
            let elemento = {
                name: $("#Skname").val(),
                brand: $("#Skbrand").val(),
                year: $("#Skyear").val(),
                description: $("#Skdescription").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://150.230.91.74:8080/api/Skate/save",
                data: dataToSend,
                datatype: 'json',
                success: function (response) {
                    console.log(response);
                    console.log("Se guardo correctamente la patineta");
                    traerInformacionSkate();
                    $("#miListaSkate").empty();
                    $("#Skname").val("");
                    $("#Skbrand").val("");
                    $("#Skyear").val("");
                    $("#Skdescription").val("");
                    alert("Se guardo correctamente la patineta")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se guardo correctamente la patineta")
                }
            });
    }
}

function borrarSkate(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
    console.log(dataToSend);
    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url:"http://150.230.91.74:8080/api/Skate/"+idElemento,
        type: 'DELETE',
        contentType: "application/JSON",
        success: function (response) {
            console.log(response);
            $("#miListaSkate").empty();
            alert("Se ha eliminado correctamente la patineta")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se eliminó correctamente la patineta")
            }
        });
}

function actualizarInformacionSkate(idElemento) {
    
    if($("#Skname").val().length == 0 || $("#Skbrand").val().length == 0 || $("#Skyear").val().length == 0 || $("#Skdescription").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#Skname").val(),
            brand: $("#Skbrand").val(),
            year: $("#Skyear").val(),
            description: $("#Skdescription").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://150.230.91.74:8080/api/Skate/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaSkate").empty();
                traerInformacionSkate();
                alert("Se ha actualizado correctamente la patineta")
                $("#miListaSkate").empty();
                $("#id").val("");
                $("#Skname").val("");
                $("#Skbrand").val("");
                $("#Skyear").val("");
                $("#Skdescription").val("");
                $("#select-category").val("");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se ha actualizado correctamente la patineta")
            }
        });
    }
}
