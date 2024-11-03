//La palabra async no es necesaria en las funcviones, porque ya son asincronas
//Igual proyectan una csincronia visual

async function hola(nombre) {
    return new Promise(function(resolve, reject) {
        setTimeout(function () {
            console.log("Hola " + nombre);
            resolve(nombre);
        }, 1000);
    });
 }
 
 async function hablar(){
    return new Promise((resolve, reject) => { //sintaxis es6
        setTimeout( function (){
            console.log("bla bla bla");
            resolve();
        }, 1000);
    });
 }
 
 async function adios(nombre, ) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            console.log("Adiós", nombre);
            resolve();
            reject("Hay un error");
        }, 1000);
    });
 }

 // await hola("David"); //Esto es una mala sintaxis
 // await solo es valido dentro de una función asincrona
 async function main() {
    let nombre = await hola("David");
    await hablar();
    await hablar();
    await hablar();
    await adios(nombre);
    console.log("Termina el proceso...");
 }


 console.log("Empezamos el proceso...");
 main();
console.log("Esta va a ser la segunda instrucción");