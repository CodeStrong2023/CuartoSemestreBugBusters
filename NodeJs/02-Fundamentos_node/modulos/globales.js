// this === global = true

//Mostrar algo en consola.
//console.log();

//Mostrar un mensaje en forma de error
//console.log();

//Ejecutar un codigo despues de un intervalo de tiempo
//setTimeout(() => {});

//Ejecutar un codigo cada intervalo de tiempo
//setInterval(() => {});

//Da prioridd de ejecución a una función asincronica
//setImmedite(() => {});

//console.log(setInterval);


let i = 0;
let intervalo = setInterval(() => {
    console.log("Hola");
    if (i === 3) {
        clearInterval(intervalo);; //detenemos la funcion
    }
    i++;
}, 1000);

setImmediate(() => {
    console.log("Saludo inmediato");
});

//require();

console.log(__filename);

global.miVariable = "mi variable global"; //Variable global forma parte de node
console.log(miVariable);