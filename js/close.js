const salir = document.getElementById("salir");

salir.addEventListener("click", () => {
    logoutBoton();
})

function logoutBoton() {
    
    
    localStorage.removeItem('emailActivo');
    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
    localStorage.removeItem('puesto');
    localStorage.removeItem('puesto');
    window.location.href = "login.html";
}

let warningTimeout;
let logoutTimeout;


function showSessionWarning() {
    document.getElementById('sessionWarning').style.display = 'block';
}

function showSessionWarningclose() {
    document.getElementById('sessionWarning').style.display = 'none';
}


function logout() {
    
    alert('Sesión cerrada automáticamente debido a inactividad.');
    localStorage.removeItem('emailActivo');
    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
    localStorage.removeItem('puesto');
    localStorage.removeItem('puesto');
    window.location.href = "login.html";
}


function resetTimers() {
    showSessionWarningclose();
    clearTimeout(warningTimeout);
    clearTimeout(logoutTimeout);

  
    warningTimeout = setTimeout(showSessionWarning, 1680000); 
    logoutTimeout = setTimeout(logout, 1800000); // 30 minutos para cerrar sessión por inactividad
}


document.addEventListener('mousemove', resetTimers);
document.addEventListener('keydown', resetTimers);


resetTimers();