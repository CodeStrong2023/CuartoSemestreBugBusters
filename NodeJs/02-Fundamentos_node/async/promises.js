function hola(nombre) {
   return new Promise(function(resolve, reject) {
       setTimeout(function () {
           console.log("Hola " + nombre);
           resolve(nombre);
       }, 1000);
   });
}

function hablar(){
   return new Promise((resolve, reject) => { //sintaxis es6
       setTimeout( function (){
           console.log("bla bla bla");
           resolve(nombre);
       }, 1000);
   });
}

function adios(nombre, ) {
   return new Promise((resolve, reject) => {
       setTimeout(function() {
           console.log("Adiós", nombre);
           //resolve();
           reject("Hay un error");
       }, 1000);
   });
}


//Llamamos a la funcion 
console.log("iniciando el proceso...")
hola("Ariel")
   .then(hablar)
   .then(hablar)
   .then(hablar)
   .then(adios)
   .then((nombre) => {
      console.log("terminando el proceso...");
   })
   .catch(error =>{
      console.error("Ha habido un error:");
      console.error(error);
   }) 
   