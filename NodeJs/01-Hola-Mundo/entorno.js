
let saludo = process.env.NOMBRE || "Sin nombre"; //variables de entorno
let web = process.env.WEB || "No tengoo web";

console.log("Hola " +  nombre)
console.log("Mi web es: " +  web)