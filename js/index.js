
const buscar = document.getElementById("buscar");

var consumo = 0;
var disponible_actual = 0;


function opciones(value, row){
    return '<div class = "container row" style = "padding:1px;"><div class = "col-6"> <button data-id = '+row.id_opciones+' class="eliminar btn btn-danger"><i class="bi bi-trash3-fill"></i></button></div>'+

    '<div class = "col-6"> <button data-toggle="modal" data-target="#zoom" data-id = '+row.id_opciones+' class="detalle btn btn-success"><i class="bi bi-list-task"></i></button></div></div>'
}

$(document).on("click", ".detalle", function(){
  console.log( $(this).data("id")  )
  var data = {
    id_cosecha : $(this).data("id") 
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }


  const url = "https://apirest.greenfieldmf.com/api/cosechaAguacate/getCosechaSectores";
  fetch(url,options)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    $('#table2').bootstrapTable('load', data);
    })
  .catch(error => {
    console.error("Error al buscar registros:", error);
  });
})



$(document).on("click", ".eliminar", function(){

  var message = confirm("¿Esta seguro de eliminar el registro?")

  if(message){

    
var data = {
  id_cosecha : $(this).data("id")
}

const options = {
  method: "POST",
  body: JSON.stringify(data),
  headers : {
    'Content-Type':'application/json'
  }
}

fetch("https://apirest.greenfieldmf.com/api/cosechaAguacate/deleteSectorCosecha", options)
.then(resp => resp.json())
.then(resp => {
  console.log(resp)
  if (resp.status == "CORRECTO") {
    
fetch("https://apirest.greenfieldmf.com/api/cosechaAguacate/deleteCosechaAguacate", options)
.then(resp => resp.json())
.then(resp => {
  console.log(resp)
  if (resp.status == "CORRECTO") {
    consultar();
  }
  
})
.catch(error => {
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: error.message,
    showConfirmButton: false,
    timer: 2000
  })
})

  }
})
.catch(error => {
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: error.message,
    showConfirmButton: false,
    timer: 2000
  })
})

  }


})


    obtenerRegistros();


    function obtenerRegistros(){
        const fechaActual = new Date();
    
        // Resta un mes a la fecha actual
        fechaActual.setMonth(fechaActual.getMonth() - 1);
    
        // Obtiene el primer día del mes anterior
        const primerDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    
        // Obtiene el último día del mes anterior
        const ultimoDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);
    
        // Formatea las fechas en el formato que necesites (por ejemplo, yyyy-mm-dd)
        const formatoFecha = { day: "2-digit", month: "2-digit", year: "numeric" };
        const primerDiaFormatted = primerDiaMesAnterior.toLocaleDateString(undefined, formatoFecha);
        const ultimoDiaFormatted = ultimoDiaMesAnterior.toLocaleDateString(undefined, formatoFecha);
    
        const añoi = primerDiaFormatted.slice(6);
        const mesi = primerDiaFormatted.slice(3, 5);
        const dia1 = primerDiaFormatted.slice(0, 2);
    
        const valorinicialfecha = parseInt(añoi) + parseInt(mesi) + parseInt(dia1);
    
        const añof = ultimoDiaFormatted.slice(6);
        const mesf = ultimoDiaFormatted.slice(3, 5);
        const diaf = ultimoDiaFormatted.slice(0, 2);
    
        const valorfinalfecha = parseInt(añof) + parseInt(mesf) + parseInt(diaf)
    
        var fechaIinput = añoi + "-" + mesi + "-" + dia1;
        var fechafinput = añof + "-" + mesf + "-" + diaf;
    
         console.log(valorinicialfecha,valorinicialfecha)
    
        document.getElementById("fechaitxt").value = fechaIinput;
        document.getElementById("fechaftxt").value = fechafinput;
    
       /* var data = {
            fechai: document.getElementById("fechaitxt").value,
            fechaf: document.getElementById("fechaftxt").value,
            estatus: 0,
          }
    
          const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          }
    
          const url = "https://apirest.greenfieldmf.com/api/cosechaAguacate/getCosechaAguacate";
    
          fetch(url,options)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            $('#table').bootstrapTable('load', data);
    
          })
          .catch(error => {
            console.error("Error al buscar registros:", error);
          });*/
    }

buscar.addEventListener("click", () => {
consultar();
})

function consultar(){
  var data = {
    fechai: document.getElementById("fechaitxt").value,
    fechaf: document.getElementById("fechaftxt").value,
    estatus: 0,
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }


  const url = "https://apirest.greenfieldmf.com/api/cosechaAguacate/getCosechaAguacate";
  fetch(url,options)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    $('#table').bootstrapTable('load', data);

  })
  .catch(error => {
    console.error("Error al buscar registros:", error);
  });
}



if (!localStorage.getItem('emailActivo')) {
    window.location.href = "login.html";
  } else {
    document.getElementById("usuario").innerHTML = localStorage.getItem('nombre');
    //console.log("pintar user")
  }




