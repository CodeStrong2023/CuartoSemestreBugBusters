// VARIABLES GLOBALES

let ataqueJugador;
let ataqueEnemigo;
let personajeVida = 3;
let enemigoVida = 3;

let ganador = document.getElementById("ganador");
let vidaPersonaje = document.getElementById("personaje-vida");
let vidaEnemigo = document.getElementById("enemigo-vida");
let mensajeGanador = document.getElementById("mensaje-ganador");

let btnPunio = document.getElementById("boton-punio");
let btnPatada = document.getElementById("boton-patada");
let btnBarrida = document.getElementById("boton-barrida");

let sectionSeleccionarPersonaje = document.getElementById("seleccionar-personaje");
let seccionSeleccionarPersonaje = document.getElementById("select-personaje")
let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
let sectionReiniciar = document.getElementById("boton-reiniciar");
let seccionMensaje = document.getElementById("mensajes");
let seccionReglas = document.getElementById("reglas");
let menuPrincipal = document.getElementById("menu")

seccionReglas.style.display = "none";


let parrafo = document.createElement("p");

function cargarMenuPrincipal(){
  let btnJugar = document.getElementById("btn-jugar");
  btnJugar.addEventListener("click", iniciarJuego)

  let btnReglas = document.getElementById("btn-reglas");
  btnReglas.addEventListener("click", () => {
    seccionReglas.style.display = "block";
    menuPrincipal.style.display = "none";
  })

  sectionSeleccionarPersonaje.style.display = "none";
  sectionSeleccionarAtaque.style.display = "none";
  sectionReiniciar.style.display = "none";
}

function iniciarJuego() {
  menuPrincipal.style.display = "none";
  sectionSeleccionarPersonaje.style.display = "block";


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

function seleccionarPersonajeJugador() {
  let personajes = document.getElementsByName("personaje");
  let spanPersonajeJugador = document.getElementById("personaje-jugador");
 
  
  let personajeSeleccionado = false;

  for (let personaje of personajes) {
    if (personaje.checked) {
      personajeSeleccionado = true;

      if (personaje.id == "zuko") {
        spanPersonajeJugador.innerHTML = "Zuko";
      } else if (personaje.id == "katara") {
        spanPersonajeJugador.innerHTML = "Katara";
      } else if (personaje.id == "aang") {
        spanPersonajeJugador.innerHTML = "Aang";
      } else {
        spanPersonajeJugador.innerHTML = "Toph";
      }

      sectionSeleccionarAtaque.style.display = "block";
      sectionSeleccionarPersonaje.style.display = "none";
      break; 
    }
  }

  if (!personajeSeleccionado) {
    const msj = document.createElement("p")
    msj.textContent = "Debes seleccionar un personaje";
    msj.style.color = "red";
    sectionSeleccionarPersonaje.appendChild(msj);
    setTimeout(() =>{
      sectionSeleccionarPersonaje.removeChild(msj);
    },1300)
  }
}

function seleccionarEnemigoRandom() {
  let enemigoRandom = document.getElementById("personaje-enemigo");
  let numRandom = Math.round(Math.random() * 3 + 1);
  if (numRandom == 1) {
    enemigoRandom.innerHTML = "Zuko";
  } else if (numRandom == 2) {
    enemigoRandom.innerHTML = "Katara";
  } else if (numRandom == 3) {
    enemigoRandom.innerHTML = "Aang";
  } else {
    enemigoRandom.innerHTML = "Toph";
  }
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
    crearMensaje(`Tu personaje: ${ataqueJugador} | enemigo: ${ataqueEnemigo} - ${ganador}`);
    vidaEnemigo.innerHTML = --enemigoVida; //restamos la vida del enemigo si nuestro personaje gana
    if (enemigoVida == 0) {
    }
  } else if (ataqueJugador == ataqueEnemigo) {
    ganador = "EMPATE";
    crearMensaje(`Tu personaje: ${ataqueJugador} | enemigo: ${ataqueEnemigo} - ${ganador}`);
  } else {
    ganador = "PERDISTE";
    crearMensaje(`Tu personaje: ${ataqueJugador} | enemigo: ${ataqueEnemigo} - ${ganador}`);
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
