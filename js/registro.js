const agregar = document.getElementById("btn_agregar");
const centro_costo = document.getElementById("centro_costo_corte");
var contador = 0;
var cantidades_arreglo = [];
var cantidades_sectores_elegidos = [];
var cantidades_sectores = [];
var cantidades_ranchos = [];
var controlador = 0;
//$(document).ready(() => {


    const form = document.getElementById("form_coshAguacate");
var inputFecha = document.getElementById("fecha");



var fecha_hoy = new Date();

var fechaFormat = fecha_hoy.toISOString().split("T")[0];

inputFecha.value = fechaFormat;


form.addEventListener("submit", (e) =>{
e.preventDefault();

if (cantidades_arreglo.length == 0) return alert("Indique los sectores cosechados")

var data = {
fecha: $("#fecha").val(),
folio : $("#folio").val(),
rancho : $("#centro_costo_facturacion").val(),
cliente : $("#cliente").val(),
placas : $("#placas").val(),
chofer: $("#chofer").val(),
cuadrillero : $("#cuadrillero").val(),
tipo_corte : $("#tipo_corte").val(),
kg_netos : $("#kg_netos").val(),
usuario : localStorage.getItem("emailActivo") 
}

var options = {
    method : "POST",
    body : JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
  }

fetch("https://apirest.greenfieldmf.com/api/cosechaAguacate/addCosecha", options)
.then(resp => resp.json())
.then(resp => {
    console.log(resp)
    if (resp.status == "CORRECTO") {
      
      saveSector(resp.id);

    }
})

})


function saveSector(id){

  const tamaño = cantidades_arreglo.length;

for (let index = 0; index < cantidades_arreglo.length; index++) {
  console.log($("#sector"+index).val(), $("#cantidad"+index).val())

if (cantidades_arreglo[index] != "" ) {
  var data =  {
    id_cosecha: id,
    fecha : $("#fecha").val(),
    cajas : $("#cantidad"+index).val(),
    hinicio : $("#hinicio"+index).val(),
    hfin : $("#hfin"+index).val(),
    sector : $("#sector"+index).val(),
    usuario : localStorage.getItem('emailActivo'),
    ranchito : $("#rancho"+index).val()
     }

     var options = {
      method : "POST",
      body : JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
    }

  fetch("https://apirest.greenfieldmf.com/api/cosechaAguacate/addCosechaSector", options)
  .then(resp => resp.json())
  .then(resp => {
    console.log(resp)
   if (resp.status == "CORRECTO" && (tamaño-1) == index ) {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Registro con éxito",
      showConfirmButton: false,
      timer: 3000,
    });
setTimeout(() => {
window.location.href = "registro.html";
},3500);
   $("#variedad").html("");
   }
  })

  
}
if ( (tamaño-1) == index ) {
  Swal.fire({
    position: "top-center",
    icon: "success",
    title: "Registro con éxito",
    showConfirmButton: false,
    timer: 3000,
  });
setTimeout(() => {
window.location.href = "registro.html";
},3500);
 $("#variedad").html("");
 }

}


}


fetch("https://api2.greenfieldmf.com/api/getCecos/")
.then(resp => resp.json())
.then( resp=> {
resp.forEach(element => {
//console.log(element)
if (element.CULTIVO == "AGUACATE") {
$("#centro_costo_facturacion").append("<option id='prueba' value="+element.CODIGO+">"+element.CODIGO+"-"+element.DESCRIPCION+"</option>")
}

});
})

fetch("https://api2.greenfieldmf.com/api/getCecos/")
.then(resp => resp.json())
.then( resp=> {
resp.forEach(element => {
//console.log(element)
if (element.CULTIVO == "AGUACATE") {
$("#centro_costo_corte").append("<option id='prueba' value="+element.CODIGO+">"+element.CODIGO+"-"+element.DESCRIPCION+"</option>")
}

});
})


var chofer = document.getElementById('chofer');


chofer.addEventListener('input', function () {

  var value = chofer.value;

 
  var capitalizedValue = capitalizeFirstLetter(value);


  chofer.value = capitalizedValue;
});

  var cuadrillero = document.getElementById('cuadrillero');


cuadrillero.addEventListener('input', function () {

  var value = cuadrillero.value;

 
  var capitalizedValue = capitalizeFirstLetter(value);


  cuadrillero.value = capitalizedValue;
});



  var cliente = document.getElementById('cliente');


cliente.addEventListener('input', function () {

  var value = cliente.value;

 
  var capitalizedValue = capitalizeFirstLetter(value);


  cliente.value = capitalizedValue;
});

 //convertir la primera letra en mayuscula del campo chofer
 function capitalizeFirstLetter(string) {
    return string.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }


//})


agregar.addEventListener("click", (e) => {
    e.preventDefault();

    $("#variedad").append(
'<input type="hidden" class="form-control form-control-lg selectpicker no-spinners" id="rancho'+contador+'"  name="rancho" required readonly>'+
  
'<div class="col-xl-3 col-sm-12" id="divHoraInicio'+contador+'">'+
  '<label for="mendez_chica">HORA INICIO</label>'+
  '<div class="input-group">'+
  '<div class="input-group-prepend">'+
      '<span class="input-group-text">'+
        '<i class="bi bi-watch fa-lg"style="color: #28a745!important;"></i>'+
      '</span>'+
    '</div>'+
    '<input type="time" class="form-control form-control-lg selectpicker no-spinners" id="hinicio'+contador+'"  name="rancho" required autocomplete="off">'+
  '</div>'+
  '</div>'+

  '<div class="col-xl-3 col-sm-12" id="divHoraFin'+contador+'">'+
 '<label for="mendez_chica">HORA FIN</label>'+
  '<div class="input-group">'+
  '<div class="input-group-prepend">'+
      '<span class="input-group-text">'+
        '<i class="bi bi-watch fa-lg"style="color: #28a745!important;"></i>'+
      '</span>'+
    '</div>'+
    '<input type="time" class="form-control form-control-lg selectpicker no-spinners" id="hfin'+contador+'"  name="rancho" required autocomplete="off">'+
  '</div>'+
  '</div>'+
      
      '<div class="col-xl-2 col-sm-12" id="divCantidad'+contador+'">'+
    '<label for="mendez_chica">CANTIDAD</label>'+
  '<div class="input-group">'+
  '<div class="input-group-prepend">'+
      '<span class="input-group-text">'+
        '<i class="bi bi-123 fa-lg" style="color: #28a745!important;"></i>'+
      '</span>'+
    '</div>'+
    '<input type="number" min="0" class="form-control form-control-lg selectpicker no-spinners" id="cantidad'+contador+'"  name="cantidad" required>'+
  '</div>'+
  '</div>'+
  
  '<div class="col-xl-2 col-sm-12" id="divSector'+contador+'">'+
    '<label for="mendez_grande">SECTOR</label>'+
  '<div class="input-group">'+
    '<div class="input-group-prepend">'+
      '<span class="input-group-text">'+
        '<i class="bi bi-123 fa-lg" style="color: #28a745!important;"></i>'+
      '</span>'+
    '</div>'+
 
    '<select data-id = '+contador+' class="sector form-control form-control-lg selectpicker text-dark" id="sector'+contador+'" '+
    ' name="sector" required> '+
    '<option value="">SELECCIONE SECTOR</option>'+
  '</select>'+

  '</div>'+
  '</div>'+
  
  '<div class="col-2 my-4" id="divButton'+contador+'">'+
  '<button type="submit" data-id = '+contador+' class="delete btn1 btn-danger my-2 btn-block" id="" style="height: 50px;">'+
  '<b><i class="bi bi-trash3-fill"></i></b> </button>'+
  '</button>'+
  '</div>');
  
  cantidades_arreglo.push('<div class="col-xl-5 col-sm-12">'+
  '<label for="mendez_chica">CANTIDAD</label>'+
'<div class="input-group">'+
'<div class="input-group-prepend">'+
    '<span class="input-group-text">'+
      '<i class="bi bi-123 fa-lg" style="color: #28a745!important;"></i>'+
    '</span>'+
  '</div>'+
  '<input type="number" min="0" class="form-control form-control-lg selectpicker no-spinners" id="cantidad'+contador+'"  name="cantidad" required>'+
'</div>'+
'</div>'+

'<div class="col-xl-5 col-sm-12">'+
  '<label for="mendez_grande">SECTOR</label>'+
'<div class="input-group">'+
  '<div class="input-group-prepend">'+
    '<span class="input-group-text">'+
      '<i class="bi bi-123 fa-lg" style="color: #28a745!important;"></i>'+
    '</span>'+
  '</div>'+
  '<input type="number" min="0" class="form-control form-control-lg selectpicker no-spinners" id="sector'+contador+'" name="sector" required>'+
'</div>'+
'</div>'+

'<div class="col-2 my-4">'+
'<button type="submit" data-id = '+contador+' class="delete btn1 btn-danger my-2 btn-block" id="" style="height: 50px;">'+
'<b><i class="bi bi-trash3-fill"></i></b> </button>'+
'</button>'+
'</div>');
sector(contador);
contador++;

});

$(document).on("change", ".sector", function(){
var sector = $(this).data("id");

for (let index = 0; index < cantidades_ranchos.length; index++) {
  
  if ( cantidades_ranchos[index] == $("#rancho"+sector).val() && cantidades_sectores_elegidos[index] == $("#sector"+sector).val() ) {
    document.getElementById("sector"+index).style.backgroundColor = "red";
    alert("Este sector y centro de costo ya lo registro, actualice solo la cantidad si es el caso");
    $("#sector"+sector).val("");
    setTimeout(() => {
      document.getElementById("sector"+index).style.backgroundColor = "white";
    },10000)
    return 
  }

}

  cantidades_sectores_elegidos.push($("#sector"+sector).val());
  cantidades_ranchos.push($("#rancho"+sector).val())


controlador = 0;
for (let index = 0; index < cantidades_sectores.length; index++) {
  
  if (cantidades_sectores[index] == $("#sector"+sector).val()) {
    cantidades_sectores[index] = ""; 
  }
}
console.log(cantidades_sectores)
for (let index = 0; index < cantidades_sectores.length; index++) {
  
  if (cantidades_sectores[index] != "") {
    controlador = 1;
  }
}

if (controlador == 0) {
  agregar.disabled = true;
}else{
  agregar.disabled = false;
}
console.log(cantidades_sectores_elegidos, cantidades_ranchos)

})

centro_costo.addEventListener("change", () => {
  //controlador = 0;
  //contador = 0;
cantidades_arreglo = [];
cantidades_sectores = [];
  //$("#variedad").html("");
  agregar.disabled = false;
  fetch("https://apirest.greenfieldmf.com/api/plagas/getSectores/")
  .then(resp => resp.json())
  .then(resp => {
  // console.log(resp)
    resp[0].forEach(element => {
    //console.log(element)
      if ($("#centro_costo_corte").val() == element.centro_costo && element.CULTIVO == "AGUACATE") {
        cantidades_sectores.push(element.CODSECTOR);
        }
    });
  })
})



function sector(contador) {
  console.log($("#centro_costo_corte").val());
  document.getElementById("rancho"+contador).value = $("#centro_costo_corte").val();
  for (let index = 0; index < cantidades_sectores.length; index++) {
    if (cantidades_sectores[index] !== "") {
      console.log(cantidades_sectores);
      $("#sector" + contador).append('<option value="' + cantidades_sectores[index] + '">' + cantidades_sectores[index] + '</option>');
     
    }
  }


  if ($("#cantidad"+contador).val() == "" || $("#sector"+contador).val() == "") {
    agregar.disabled = true;
  }else{
    agregar.disabled = false;
  }

  if (contador > 0) {
    document.getElementById("sector"+(contador-1)).disabled = true;
  }

}



$(document).on("click", ".delete", function(e){
    e.preventDefault();
    agregar.disabled = false;
   console.log( $(this).data("id") )
   cantidades_arreglo[ $(this).data("id") ] = "";
  
document.getElementById("divCantidad"+$(this).data("id")).style.display = "none";
document.getElementById("divSector"+$(this).data("id")).style.display = "none";
document.getElementById("divButton"+$(this).data("id")).style.display = "none";
document.getElementById("divHoraInicio"+$(this).data("id")).style.display = "none";
document.getElementById("divHoraFin"+$(this).data("id")).style.display = "none";
document.getElementById("sector"+$(this).data("id")).removeAttribute('required');
document.getElementById("cantidad"+$(this).data("id")).removeAttribute('required');
document.getElementById("hfin"+$(this).data("id")).removeAttribute('required');
document.getElementById("hinicio"+$(this).data("id")).removeAttribute('required');
document.getElementById("rancho"+$(this).data("id")).removeAttribute('required');
cantidades_arreglo[$(this).data("id")] = "";
cantidades_sectores.push( document.getElementById("sector"+$(this).data("id")).value )

cantidades_sectores_elegidos[$(this).data("id")] = "";

})

centro_costo.addEventListener("change", () => {
 agregar.disabled = false;
  fetch("https://apirest.greenfieldmf.com/api/plagas/getSectores/")
  .then(resp => resp.json())
  .then(resp => {
  // console.log(resp)
    resp[0].forEach(element => {
      
      if ($("#centro_costo").val() == element.centro_costo && element.CULTIVO == localStorage.getItem("cultivo")) {
        console.log(element.CODSECTOR)
        $("#sectores").append('<label for="">'+element.CODSECTOR+'</label>'+
                              '<input class = "sector" id="sector'+element.CODSECTOR+'"  data-id = '+element.CODSECTOR+' type="checkbox">&nbsp&nbsp&nbsp&nbsp');
                              //marcarcheckbox(element.CODSECTOR);
                              $('#MODACARGANDO').modal('hide');
      }
    });
  })

})





if (!localStorage.getItem('emailActivo')) {
  window.location.href = "login.html";
} else {
  document.getElementById("usuario").innerHTML = localStorage.getItem('nombre');
  //console.log("pintar user")
}