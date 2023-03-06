

let kokemones = []
let ataqueJugador
let secuenciaAtqEnemigo = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let inputCharmander
let inputBulbasaur 
let inputSquirtle
let mascotaJugador
let mascotaJugadorObjeto
let ataquesKokemon
let botones = []
let secuenciaAtqJugador = []
let ataquesEnemigo = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let intervalo
let mapaFondo = new Image()
mapaFondo.src = './imagenes/mokemap.webp'


const resultadoCombate = document.getElementById('resultado-combate')
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorBtnAtaques = document.getElementById('contenedorBtnAtaques')
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')


let lienzo = mapa.getContext("2d")

let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
let sectionReiniciar = document.getElementById('reiniciar')
let botonMascotaJugador = document.getElementById('boton-mascota')

//Botones
let botonReiniciar = document.getElementById('boton-reiniciar')

//Seleccion y kokemones elegidos
let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
let spanKokemonJugador = document.getElementById('kokemon-jugador')
let spanKokemonEnemigo = document.getElementById('kokemon-enemigo')

// Vidas
let spanVidaJugador = document.getElementById('vida-jugador')
let spanVidaEnemigo = document.getElementById('vida-enemigo')

//Ataques y resultado de combate
let sectionMensajes = document.getElementById('resultado')
let ataquesDelJugador = document.getElementById('ataquesDelJugador')
let ataquesPc = document.getElementById('ataquesPc')

//Creacion de kokemones con clases

class Kokemon {
    constructor(nombre, imagen, vidas, x = 10, y = 10){
        this.nombre = nombre;
        this.imagen = imagen;
        this.vidas = vidas;
        this.ataques = [];
        this.x = x
        this.y = y
        this.ancho = 80
        this.alto = 80
        this.mapaImg = new Image()
        this.mapaImg.src = imagen
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarKokemon(){
        lienzo.drawImage(
            this.mapaImg,
            this.x,
            this.y,
            this.alto,
            this.ancho
        )
    }

}


let charmander = new Kokemon('Charmander', './imagenes/charmander-removebg-preview.png', 3);
let bulbasaur = new Kokemon('Bulbasaur', "./imagenes/png-clipart-bulbasaur-bulbasaur-pokemon.png", 3);
let squirtle = new Kokemon('Squirtle', './imagenes/squirtle.png', 3);

// kokemones enemigos

let charmanderEnemigo = new Kokemon('Charmander', './imagenes/charmander-removebg-preview.png', 3 , aleatorio(0,800), aleatorio(0,550));
let bulbasaurEnemigo = new Kokemon('Bulbasaur', "./imagenes/png-clipart-bulbasaur-bulbasaur-pokemon.png", 3,aleatorio(0,800), aleatorio(0,550));
let squirtleEnemigo = new Kokemon('Squirtle', './imagenes/squirtle.png', 3,aleatorio(0,800), aleatorio(0,550));

charmander.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-planta'}
)

bulbasaur.ataques.push(
    {nombre: '🌱', id: 'boton-planta'},
    {nombre: '🌱', id: 'boton-planta'},
    {nombre: '🌱', id: 'boton-planta'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'}
)

squirtle.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-planta'},
    {nombre: '🔥', id: 'boton-fuego'}
)

kokemones.push(charmander, bulbasaur, squirtle)



function iniciarJuego() {

    kokemones.forEach((kokemon) => {
        const opcionDeKokemones = `
        <input type="radio" name="kokemones" id=${kokemon.nombre} />
        <label class="tarjeta-kokemon" for=${kokemon.nombre}>
            <p>${kokemon.nombre}</p>
            <img src=${kokemon.imagen} alt=${kokemon.nombre}>
        </label>`;
        contenedorTarjetas.innerHTML += opcionDeKokemones

         inputCharmander = document.getElementById('Charmander')
         inputBulbasaur = document.getElementById('Bulbasaur')
         inputSquirtle = document.getElementById('Squirtle')
    })

    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)

    sectionVerMapa.style.display = 'none'

}


function seleccionarMascotaJugador(){

    sectionSeleccionarMascota.style.display = 'none'

    // sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'flex'
    
   

    if (inputBulbasaur.checked) {
        spanKokemonJugador.innerHTML = inputBulbasaur.id;
        mascotaJugador = inputBulbasaur.id
    }
    else if (inputCharmander.checked) {
        spanKokemonJugador.innerHTML = inputCharmander.id;
        mascotaJugador = inputCharmander.id
    }
    else if (inputSquirtle.checked) {
        spanKokemonJugador.innerHTML = inputSquirtle.id;
        mascotaJugador = inputSquirtle.id
    }
    
    else {
        alert('Elegi algun Kokemon!')

    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
    iniciarMapa()

    pintarCanvas()
    
}

function extraerAtaques(mascotaJugador){
    let ataques 
    for (let i = 0; i < kokemones.length; i++) {
        if (mascotaJugador === kokemones[i].nombre){
            ataques = kokemones[i].ataques
        };
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesKokemon = `
        <button id=${ataque.id} class="boton-ataque btnAtaques">${ataque.nombre}</button>
        `;
        contenedorBtnAtaques.innerHTML += ataquesKokemon;
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonPlanta = document.getElementById('boton-planta')
    botones = document.querySelectorAll('.btnAtaques')


}

function secuenciaAtaques(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                secuenciaAtqJugador.push('🔥')
                console.log(secuenciaAtqJugador)
                e.target.disabled = true
            } else if (e.target.textContent === '💧') {
                secuenciaAtqJugador.push('💧')
                console.log(secuenciaAtqJugador)
                e.target.disabled = true
            } else if (e.target.textContent === '🌱') {
                secuenciaAtqJugador.push('🌱')
                console.log(secuenciaAtqJugador)
                e.target.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}




botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

function seleccionarMascotaEnemigo() {
    
    let enemigoAleatorio = aleatorio (0, kokemones.length - 1)

    spanKokemonEnemigo.innerHTML = kokemones[enemigoAleatorio].nombre

    ataquesEnemigo = kokemones[enemigoAleatorio].ataques

    console.log(ataquesEnemigo)
    
    secuenciaAtaques()
}

function aleatorio(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function ataqueAleatorioEnemigo(){
    
    let ataqueAleatorio = aleatorio(0,ataquesEnemigo.length - 1)
    secuenciaAtqEnemigo.push(ataquesEnemigo[ataqueAleatorio].nombre)
    ataquesEnemigo.splice(ataqueAleatorio, 1)

    console.log(ataquesEnemigo)
    console.log(secuenciaAtqEnemigo)


    iniciarPelea()
}

function iniciarPelea() {
    if (secuenciaAtqJugador.length == 5) {
        combate()
    }
}

function indexAtqJugadores(jugador, enemigo) {
    indexAtaqueJugador = secuenciaAtqJugador[jugador];
    indexAtaqueEnemigo = secuenciaAtqEnemigo[enemigo];
}

function combate() {

    

    for (let i = 0; i < secuenciaAtqJugador.length; i++) {
        let victoria = '⭕'
        let derrota = '❌'
        let empate = '〰'
        let nuevoResultadoCombate = document.createElement('p')

        if (secuenciaAtqJugador[i] === secuenciaAtqEnemigo[i]) {
            indexAtqJugadores(i, i)
            crearMensaje('Empate')
            resultadoCombate.appendChild(nuevoResultadoCombate)
            nuevoResultadoCombate.innerHTML = empate
            
        } else if (secuenciaAtqJugador[i] === '🔥' && secuenciaAtqEnemigo[i] === '🌱') {
            indexAtqJugadores(i, i)
            nuevoResultadoCombate.innerHTML = victoria
            resultadoCombate.appendChild(nuevoResultadoCombate)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador
        } else if (secuenciaAtqJugador[i] === '💧' && secuenciaAtqEnemigo[i] === '🔥') {
            indexAtqJugadores(i, i)
            nuevoResultadoCombate.innerHTML = victoria
            resultadoCombate.appendChild(nuevoResultadoCombate)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador
        } else if (secuenciaAtqJugador[i] === '🌱' && secuenciaAtqEnemigo[i] === '💧') {
            indexAtqJugadores(i, i)
            nuevoResultadoCombate.innerHTML = victoria
            resultadoCombate.appendChild(nuevoResultadoCombate)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador
        } else {
            indexAtqJugadores(i, i)
            nuevoResultadoCombate.innerHTML = derrota
            resultadoCombate.appendChild(nuevoResultadoCombate)
            crearMensaje("Perdiste")
            victoriasEnemigo++
            spanVidaEnemigo.innerHTML = victoriasEnemigo
        }
        revisarVidas()
    }

}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo ){
        crearMensajeFinal('Es un empate!')
    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('Felicitaciones ganaste!')
    } else{
        crearMensajeFinal('Mala suerte! Perdiste!')
    }
}

function crearMensaje(resultado) {

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaquePc = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaquePc.innerHTML = indexAtaqueEnemigo

    /* let parrafo = document.createElement('p')
    parrafo.innerHTML = 'Tu Kokemon uso un ataque tipo ' + ataqueJugador + ', ' + 'el enemigo uso un ataque tipo ' + ataqueEnemigo + '. ' + resultado */

    ataquesDelJugador.appendChild(nuevoAtaqueJugador)
    ataquesPc.appendChild(nuevoAtaquePc)

}

function reiniciarJuego() {
    location.reload()
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapaFondo,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarKokemon()
    charmanderEnemigo.pintarKokemon()
    bulbasaurEnemigo.pintarKokemon()
    squirtleEnemigo.pintarKokemon()

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
        revisarColision(charmanderEnemigo)
        revisarColision(bulbasaurEnemigo)
        revisarColision(squirtleEnemigo)
    } 
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
    
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = - 5
    
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = - 5
    
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
    
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function teclaApretada(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        
        case 'ArrowDown':
            moverAbajo()
            break;

        case 'ArrowLeft':
            moverIzquierda()
            break;
    
        case 'ArrowRight':
            moverDerecha()
            break;

        default:
            break;
    }
}

function iniciarMapa(){
    mapa.width = 800
    mapa.height = 600
    mascotaJugadorObjeto = extraerObjetosKokemon(mascotaJugador)

    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', teclaApretada)
    window.addEventListener('keyup', detenerMovimiento)
}

function extraerObjetosKokemon(){
    for (let i = 0; i < kokemones.length; i++) {
        if (mascotaJugador === kokemones[i].nombre){
            return kokemones[i]
        };
        
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
            return
    }

    detenerMovimiento()
    alert("Enfrentate al " + enemigo.nombre + " enemigo")

}

window.addEventListener('load', iniciarJuego)