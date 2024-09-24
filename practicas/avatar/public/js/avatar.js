import { personajes } from "./personajes.js"; //importamos la lista con los personajes

// VARIABLES GLOBALES
let personajeEnemigo;
let personajeJugador;
let ataqueJugador;
let ataqueEnemigo;
let personajeVida = 3;
let enemigoVida = 3;

let ganador = document.getElementById("ganador");
let vidaPersonaje = document.getElementById("personaje-vida");
let vidaEnemigo = document.getElementById("enemigo-vida");

let btnPunio = document.getElementById("boton-punio");
let btnPatada = document.getElementById("boton-patada");
let btnBarrida = document.getElementById("boton-barrida");

let sectionSeleccionarPersonaje = document.getElementById("seleccionar-personaje");
let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
let sectionReiniciar = document.getElementById("boton-reiniciar");
let seccionMensaje = document.getElementById("mensajes");
let seccionReglas = document.getElementById("reglas");
let menuPrincipal = document.getElementById("menu");

let botonVolverReglas = document.getElementById("boton-volver-reglas-juego");
let botonVolverJugar = document.getElementById("boton-volver-jugar");

botonVolverReglas.addEventListener("click", volverAlMenu);
botonVolverJugar.addEventListener("click", volverAlMenu);

function volverAlMenu() {
  menuPrincipal.style.display = "block"; 
  seccionReglas.style.display = "none"; 
  sectionSeleccionarPersonaje.style.display = "none"; 
  sectionSeleccionarAtaque.style.display = "none"; 
  sectionReiniciar.style.display = "none";
}


seccionReglas.style.display = "none";

let parrafo = document.createElement("p");

function cargarMenuPrincipal() {
    let btnJugar = document.getElementById("btn-jugar");
    btnJugar.addEventListener("click", iniciarJuego);

    let btnReglas = document.getElementById("btn-reglas");
    btnReglas.addEventListener("click", () => {
        seccionReglas.style.display = "block";
        menuPrincipal.style.display = "none";
    });

    sectionSeleccionarPersonaje.style.display = "none";
    sectionSeleccionarAtaque.style.display = "none";
    sectionReiniciar.style.display = "none";
    seccionReglas.style.display = "none";
}

function iniciarJuego() {
    menuPrincipal.style.display = "none";
    sectionSeleccionarPersonaje.style.display = "block";

    generarPersonaje();

    let botonPersonajeJugador = document.getElementById("boton-personaje");
    botonPersonajeJugador.addEventListener("click", function () {
        seleccionarPersonajeJugador(), seleccionarEnemigoRandom();
    });

    btnPunio.addEventListener("click", ataquePunio);
    btnPatada.addEventListener("click", ataquePatada);
    btnBarrida.addEventListener("click", ataqueBarrida);
    let btnReiniciar = document.getElementById("boton-reiniciar");
    btnReiniciar.addEventListener("click", reiniciarJuego);
}

function reiniciarJuego() {
    location.reload();
}

function generarPersonaje(){ //esta función modifica dinamicamente los inputs en el html para crear a los jugadores
    const personajesContainer = document.getElementById('personajes-container');

    if (personajesContainer.children.length > 0) { //si ya hay elementos en el contenedor, no los vuelve a generar
        return;
    }

    personajes.forEach((personaje) => {
        let radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'personaje';
        radioInput.id = personaje.nombre.toLowerCase();
        radioInput.value = personaje.nombre;

        let label = document.createElement('label');
        label.htmlFor = personaje.nombre.toLowerCase();
        label.id = personaje.nombre.toLowerCase();
        label.innerHTML = personaje.nombre;

        personajesContainer.appendChild(radioInput);
        personajesContainer.appendChild(label);
        personajesContainer.appendChild(document.createElement('br'));
    });
}

function seleccionarPersonajeJugador() {
    let personajes = document.getElementsByName("personaje");
    let spanPersonajeJugador = document.getElementById("personaje-jugador");

    let personajeSeleccionado = false;

    for (let personaje of personajes) {
        if (personaje.checked) {
            personajeSeleccionado = true;
            personajeJugador = personaje.value;
            spanPersonajeJugador.innerHTML = personajeJugador;
            sectionSeleccionarAtaque.style.display = "block";
            sectionSeleccionarPersonaje.style.display = "none";
            break;
        }
    }

    if (!personajeSeleccionado) {

        let msjExistente = document.getElementById("error")

        if (!msjExistente) {
            const msj = document.createElement("p");
            msj.textContent = "Debes seleccionar un personaje";
            msj.style.color = "red";
            msj.style.fontWeight = "bold";
            msj.id = "error"
            sectionSeleccionarPersonaje.appendChild(msj);
            setTimeout(() => {
                sectionSeleccionarPersonaje.removeChild(msj);
            }, 1300);
        }
    }
}

function seleccionarEnemigoRandom() {
    let enemigoRandom = document.getElementById("personaje-enemigo");
    let numRandom = Math.floor(Math.random() * personajes.length);
    personajeEnemigo = personajes[numRandom].nombre;
    enemigoRandom.innerHTML = personajeEnemigo;
}

function ataquePunio() {
    ataqueJugador = "Punio";
    ataqueAleatorioEnemigo();
}

function ataquePatada() {
    ataqueJugador = "Patada";
    ataqueAleatorioEnemigo();
}

function ataqueBarrida() {
    ataqueJugador = "Barrida";
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = Math.round(Math.random() * 2 + 1);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "Punio";
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "Patada";
    } else {
        ataqueEnemigo = "Barrida";
    }
    ganadorPelea(ataqueJugador, ataqueEnemigo);
}

function crearMensaje(mensaje) {
    parrafo.innerHTML = mensaje;
    seccionMensaje.appendChild(parrafo);
}

function ganadorPelea(ataqueJugador, ataqueEnemigo) {
    if (
        (ataqueJugador == "Punio" && ataqueEnemigo == "Barrida") ||
        (ataqueJugador == "Patada" && ataqueEnemigo == "Punio") ||
        (ataqueJugador == "Barrida" && ataqueEnemigo == "Patada")
    ) {
        ganador = "GANASTE";
        crearMensaje(
            `Tu personaje: ${ataqueJugador} | Enemigo: ${ataqueEnemigo} - ${ganador}`
        );
        vidaEnemigo.innerHTML = --enemigoVida; //restamos la vida del enemigo si nuestro personaje gana
        if (enemigoVida == 0) {
        }
    } else if (ataqueJugador == ataqueEnemigo) {
        ganador = "EMPATE";
        crearMensaje(
            `Tu personaje: ${ataqueJugador} | enemigo: ${ataqueEnemigo} - ${ganador}`
        );
    } else {
        ganador = "PERDISTE";
        crearMensaje(
            `Tu personaje: ${ataqueJugador} | enemigo: ${ataqueEnemigo} - ${ganador}`
        );
        vidaPersonaje.innerHTML = --personajeVida; //restamos la vida de nuestro personaje si el enemigo gana
        if (personajeVida == 0) {
        }
    }
    //Revisar vidas
    revisarVidas();
}

function revisarVidas() {
    if (enemigoVida == 0) {
        crearMensaje("FELICITACIONES!!! HAS GANADO! 🎉🎉");
        deshabilitarBtn();
    } else if (personajeVida == 0) {
        crearMensaje("QUE PENA, HAS PERDIDO 😔");
        deshabilitarBtn();
    }
}

function deshabilitarBtn() {
    btnPunio.disabled = true;
    btnPatada.disabled = true;
    btnBarrida.disabled = true;
    sectionReiniciar.style.display = "inline-block";
}

window.addEventListener("load", cargarMenuPrincipal);
