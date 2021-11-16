function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://150.230.91.74:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta){

    let myTable = "<table class='ui center aligned celled table'>" + 
       "<thead><tr><th>ESTADO</th><th>TOTAL POR ESTADO</th></tr></thead>";
    myTable+="<tr>";
        myTable+="<td>completadas</td>";
        myTable+="<td>"+respuesta.completed+"</td>"+"</tr>";
        myTable+="<tr>"+"<td>canceladas</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>"+"</tr>";
     //myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}
function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:"http://150.230.91.74:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
}
function pintarRespuestaDate(respuesta){

        let myTable = "<table class='ui center aligned celled table'>" + 
       "<thead><tr><th>FECHA INICIO RESERVA</th><th>FECHA DEVOLUCION RESERVA</th><th>ESTADO RESERVA</th></tr></thead>";
        myTable+="<tr>";
          
        for(i=0;i<respuesta.length;i++){
        

            
            myTable+="<td>"+respuesta[i].startDate.split("T")[0]+"</td>";
            myTable+="<td>"+respuesta[i].devolutionDate.split("T")[0]+"</td>";
            myTable+="<td>"+respuesta[i].status+"</td>";
          
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoDate").html(myTable);
}

function traerReporteClientes(){
        $.ajax({
            url:"http://150.230.91.74:8080/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
}
function pintarRespuestaClientes(respuesta){

        let myTable = "<table class='ui center aligned celled table'>" + 
       "<thead><tr><th>TOTAL CLIENTES</th><th>NOMBRE CLIENTE</th><th>CORREO CLIENTE</th><th>EDAD CLIENTE</th></tr></thead>";;
        myTable+="<tr>";
          
        for(i=0;i<respuesta.length;i++){
        
            myTable+="<td>"+respuesta[i].total+"</td>";
            myTable+="<td>"+respuesta[i].client.name+"</td>";
            myTable+="<td>"+respuesta[i].client.email+"</td>";
            myTable+="<td>"+respuesta[i].client.age+"</td>";
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoClientes").html(myTable);
}