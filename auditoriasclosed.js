const buscar = document.getElementById("buscar");



  
        var data2 = {
            monitor : localStorage.getItem("emailActivo")
        }
        
        var options2 = {
            method : "POST"
           ,body: JSON.stringify(data2)
           ,headers: {
            'Content-Type': 'application/json'  
           }
        }

        Checkclosed();

        function Checkclosed() {
            const fechaActual = new Date();
        
            // Formatea las fechas en el formato que necesites (por ejemplo, yyyy-mm-dd)
            const formatoFecha = { day: "2-digit", month: "2-digit", year: "numeric" };
            const fechaActualFormatted = fechaActual.toLocaleDateString(undefined, formatoFecha);
        
            const añoi = fechaActualFormatted.slice(6);
            const mesi = fechaActualFormatted.slice(3, 5);
            const dia1 = fechaActualFormatted.slice(0, 2);
        
            const valorinicialfecha = parseInt(añoi) + parseInt(mesi) + parseInt(dia1);
        
            const añof = añoi;
            const mesf = mesi;
            const diaf = dia1;
        
            const valorfinalfecha = parseInt(añof) + parseInt(mesf) + parseInt(diaf);
        
            var fechaIinput = añoi + "-" + mesi + "-" + dia1;
            var fechafinput = añof + "-" + mesf + "-" + diaf;
        
            console.log(valorinicialfecha, valorfinalfecha);
        
            document.getElementById("fechaitxt").value = fechaIinput;
            document.getElementById("fechaftxt").value = fechafinput;


            var data = {
                fechai: document.getElementById("fechaitxt").value,
                fechaf: document.getElementById("fechaftxt").value
              }
      
              const options = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
              }

              fetch("https://apirest.greenfieldmf.com/api/calidad/getCheckClosed",options)
              .then(resp => resp.json())
              .then(resp => {
                  resp.forEach(element => {
              console.log(resp)
                      fetch('https://api2.greenfieldmf.com/api/getCecos/')
                      .then(resp => resp.json())
                      .then( respObj => {
                       let i = 0;
                        respObj.forEach(respuesta => {
                         
                          
                          if (element.centro_costo == respuesta.CODIGO) {
                              //console.log(respuesta.CODIGO, element)
                              $("#responsiva").append('<div class="col-12 bg-white">'+
                              '<button class="eliminar-ciclo-local list-group-item list-group-item-action" data-id = '+element.id_check+'  data-cultivo = '+element.cultivo+'>'+
                                  '<div class="row"><div class="col-10">'+
                                      '<div class="d-flex w-100 justify-content-between">'+
                                          '<h6 class="mb-1 font-weight-bold" style="color: rgb(59, 105, 60);">'+element.id_check+'-'+element.centro_costo+' '+respuesta.DESCRIPCION+'</h6></div>'+
                                          '<br><small class="mb-1">'+element.monitor+'hola</small></div>'+
                                          '<div class="col-2 d-flex flex-row-reverse"><small class="text-muted"><i class="bi bi-chevron-double-right"></i></small></div>'+
                              '</div>'+
                          '</button></div>')
                          }
                          
                          i=i+1;
                        });
                        
                      });
                      
                   
                  });
              }) 

        }
        
        
        buscar.addEventListener("click", () => {
            var data = {
                fechai: document.getElementById("fechaitxt").value,
                fechaf: document.getElementById("fechaftxt").value
              }
      
              const options = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
              }

              fetch("https://apirest.greenfieldmf.com/api/calidad/getCheckClosed",options)
              .then(resp => resp.json())
              .then(resp => {
                  resp.forEach(element => {
              console.log(resp)
                      fetch('https://api2.greenfieldmf.com/api/getCecos/')
                      .then(resp => resp.json())
                      .then( respObj => {
                       let i = 0;
                        respObj.forEach(respuesta => {
                         
                          
                          if (element.centro_costo == respuesta.CODIGO) {

                            if ( element.monitor == localStorage.getItem("emailActivo") && localStorage.getItem("rol").includes("CALIDAD") ) {
                                $("#responsiva").append('<div class="col-12 bg-white">'+
                                '<button class="eliminar-ciclo-local list-group-item list-group-item-action" data-id = '+element.id_check+'  data-cultivo = '+element.cultivo+'>'+
                                    '<div class="row"><div class="col-10">'+
                                        '<div class="d-flex w-100 justify-content-between">'+
                                            '<h6 class="mb-1 font-weight-bold" style="color: rgb(59, 105, 60);">'+element.id_check+'-'+element.centro_costo+' '+respuesta.DESCRIPCION+'-'+element.fecha+'</h6></div>'+
                                            '<br><small class="mb-1">'+element.monitor+'hola</small></div>'+
                                            '<div class="col-2 d-flex flex-row-reverse"><small class="text-muted"><i class="bi bi-chevron-double-right"></i></small></div>'+
                                '</div>'+
                            '</button></div>')
                            }
                            
                            if ( localStorage.getItem("rol").includes("ADMIN") ){
                                $("#responsiva").append('<div class="col-12 bg-white">'+
                                '<button class="eliminar-ciclo-local list-group-item list-group-item-action" data-id = '+element.id_check+'  data-cultivo = '+element.cultivo+'>'+
                                    '<div class="row"><div class="col-10">'+
                                        '<div class="d-flex w-100 justify-content-between">'+
                                            '<h6 class="mb-1 font-weight-bold" style="color: rgb(59, 105, 60);">'+element.id_check+'-'+element.centro_costo+' '+respuesta.DESCRIPCION+'-'+element.fecha+'</h6></div>'+
                                            '<br><small class="mb-1">'+element.monitor+'hola</small></div>'+
                                            '<div class="col-2 d-flex flex-row-reverse"><small class="text-muted"><i class="bi bi-chevron-double-right"></i></small></div>'+
                                '</div>'+
                            '</button></div>')
                            }
                            
                          }
                          
                          i=i+1;
                        });
                        
                      });
                      
                   
                  });
              }) 
        })
    

        $(document).ready(function(){
            console.log("buscar")
            
                $("#buscar_ma").on("keyup", function() {
              
               
                  var value = $(this).val().toLowerCase();
                  $("#responsiva div").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                  });
                });
              });


$(document).on('click', '.eliminar-ciclo-local', function () {
    let id = $(this).data("id");
    let cultivo = $(this).data("cultivo");
    console.log(id)
    localStorage.setItem('clave', id);
    localStorage.setItem('cultivo', cultivo);
    setTimeout(() => {
window.location.href = "checkclosed.html"
    },1000)

    });

    if (!localStorage.getItem('emailActivo')) {
        window.location.href = "login.html";
       }else{
        usuario.innerHTML = localStorage.getItem('nombre')
       }