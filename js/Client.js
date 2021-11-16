function traerInformacionClientes() {
    $.ajax({
        url: "http://150.230.91.74:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>EMAIL</th><th>PASSWORD</th><th>NAME</th><th colspan='3'>AGE</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button class='ui yellow button' onclick=' actualizarInformacionClientes("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button class='ui yellow button' onclick=' cargarDatosClientes("+respuesta[i].idClient+")'>Editar</button>";
        myTable+="<td> <button class='ui red button' onclick='borrarClientes("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}

function guardarInformacionClientes(){
    let var2 = {
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://150.230.91.74:8080/api/Client/save",
        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente el cliente");
            alert("Se guardo correctamente el cliente");
            window.location.reload()    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente el cliente");    
        }
    });
}

function cargarDatosClientes(id) {
    
        $.ajax({
            dataType: 'json',
            url:"http://150.230.91.74:8080/api/Client/"+id,
            type: 'GET',
            success: function (response) {
                console.log(response);
                var item = response;
                $("#Clemail").val(item.email),
                $("#Clpassword").val(item.password);
                $("#Clname").val(item.name);
                $("#Clage").val(item.age);                
            },
    
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error desconocido")
    
            }
        });
}

function actualizarInformacionClientes(idElemento){
    let myData={
        idClient:idElemento,
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.91.74:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            $("#idClient").val("");
            $("#Clemail").val(""),
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            traerInformacionClientes();
            alert("se ha Actualizado correctamente el cliente")
        }
    });
}

function borrarClientes(idElemento){
    let myData={
        idClient: idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://150.230.91.74:8080/api/Client/" + idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            traerInformacionClientes();
            alert("Se ha Eliminado correctamente el cliente.")
        }
    });
}

