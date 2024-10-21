
function hola(nombre, miCallback){
    setTimeout(function () {
        console.log("Hola " + nombre);
        miCallback(nombre);
    }, 1000);
}

function hablar(callbackHablar){
    setTimeout( function (){
        console.log("bla bla bla");
        callbackHablar()
    }, 1000);
}
function adios(nombre, otroCallback) {
    setTimeout(function() {
        console.log("Adiós", nombre);
        otroCallback();
    }, 1000);
}

function conversacion(nombre, veces, callback){
    if (veces > 0) {
        hablar(function (){
            conversacion(nombre, --veces, callback); //utilizamos recursividad
        });
    } else {
        callback(nombre, callback);
    }

}

//Proceso principal
console.log("Iniciando el proceso...");
hola("Ariel", function(nombre) {
    conversacion(nombre, 4, function (){
        console.log("Terminando el proceso...");
    });
});
//hola("Sofía", function(nombre) {
//    hablar(function() {
//        hablar(function() {
//           hablar(function() {
//                hablar(function() {
//                    adios(nombre, function(){
//                       console.log("Terminando el proceso...");
//                  });
//              });
//          });
//      });
//  });
// });
