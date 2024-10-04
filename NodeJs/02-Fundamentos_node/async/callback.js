
function hola(nombre, miCallback){
    setTimeout(function () {
        console.log("Hola " + nombre);
        miCallback(nombre);
    }, 1000);
}

function adios(nombre, otroCallback) {
    setTimeout(function() {
        console.log("Adiós", nombre);
        otroCallback();
    }, 1000);
}

console.log("Iniciando el proceso...");
hola("Sofía", function(nombre) {
    adios(nombre, function() {
    console.log("Terminando el proceso...");
    });
});

//hola("Sofía", function(){});
//adios("Sofía", function(){});