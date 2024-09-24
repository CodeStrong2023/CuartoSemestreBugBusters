class Personaje {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

export let personajes = [ //Lista con los personajes
    new Personaje('Zuko'),
    new Personaje('Katara'),
    new Personaje('Aang'),
    new Personaje('Toph'),
    new Personaje('Appa')
];