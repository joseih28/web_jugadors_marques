/********************************************
 *  MÓDULO 1 — MARCADOR MOLÓN
 ********************************************/

let puntos1 = 0
let puntos2 = 0

const marcador1 = document.getElementById('puntos1')
const marcador2 = document.getElementById('puntos2')

const equipo1 = document.getElementById('equipo1')
const equipo2 = document.getElementById('equipo2')

const historial = document.getElementById('lista-historial')

const botones = document.querySelectorAll("button[data-equipo]")

const local = document.getElementById('local')
const visitante = document.getElementById('visitante')

const resetBtn = document.getElementById('reset')

// Nombres de los equipos
document.getElementById('form-nombres').addEventListener('submit', function (e) {
    e.preventDefault()

    const nuevo1 = document.getElementById('input1').value.trim()
    const nuevo2 = document.getElementById('input2').value.trim()

    if (nuevo1 !== "") {
        equipo1.querySelector('.nombre').textContent = nuevo1
    }

    if (nuevo2 !== "") {
        equipo2.querySelector('.nombre').textContent = nuevo2
    }
})

// Sumar puntos
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const eq = boton.dataset.equipo
        const suma = parseInt(boton.dataset.suma)

        if (eq === "1") {
            puntos1 += suma
            marcador1.textContent = puntos1
        } else {
            puntos2 += suma
            marcador2.textContent = puntos2
        }

        actualizarLider()
        agregarhistorial(eq, suma)
    })
})

// Actualizar líder
function actualizarLider() {
    local.classList.remove('lider')
    visitante.classList.remove('lider')

    if (puntos1 > puntos2) {
        local.classList.add('lider')
    } else if (puntos2 > puntos1) {
        visitante.classList.add('lider')
    }
}

// Historial
function agregarhistorial(eq, puntos) {
    const li = document.createElement('li')
    const nombre = eq == '1'
        ? equipo1.querySelector('.nombre').textContent
        : equipo2.querySelector('.nombre').textContent

    li.textContent = `${nombre} anotó ${puntos} puntos`
    historial.prepend(li)
}

// Reset
resetBtn.addEventListener('click', () => {
    puntos1 = 0
    puntos2 = 0
    marcador1.textContent = 0
    marcador2.textContent = 0

    actualizarLider()

    const li = document.createElement('li')
    li.textContent = 'Marcador reseteado'
    historial.prepend(li)
})



/********************************************
 *  MÓDULO 2 — LISTA DE JUGADORES
 ********************************************/

const inputJugador = document.getElementById('jugador')
const btnAñadir = document.getElementById('btnAñadir')
const mensajes = document.querySelector('.mensajes')
const listaJugadores = document.getElementById('listaJugadores')

const jugadores = []

// Limpiar mensajes
function limpiarMensajes() {
    mensajes.innerHTML = ""
    mensajes.className = ""
}

// Mostrar mensajes
function mostrarMensajes(texto, tipo) {
    limpiarMensajes()

    const p = document.createElement('p')
    p.textContent = texto

    mensajes.classList.add(tipo)
    mensajes.appendChild(p)
}

function marcarError(elemento) {
    elemento.classList.remove('input-ok')
    elemento.classList.add('input-error')
}

function marcarOk(elemento) {
    elemento.classList.remove('input-error')
    elemento.classList.add('input-ok')
}

// Añadir jugadores
function añadirJugador(nombre) {
    const li = document.createElement('li')

    const span = document.createElement('span')
    span.textContent = nombre

    const btnEliminar = document.createElement('button')
    btnEliminar.type = 'button'
    btnEliminar.textContent = 'Eliminar'

    btnEliminar.addEventListener('click', () => {
        li.remove()
        mostrarMensajes(`Jugador eliminado ${nombre}`, 'ok')
    })

    li.appendChild(span)
    li.appendChild(btnEliminar)

    listaJugadores.appendChild(li)
}

// Evento click
btnAñadir.addEventListener('click', () => {

    const nombre = inputJugador.value.trim()

    if (nombre === "") {
        marcarError(inputJugador)
        mostrarMensajes('Escribe un nombre!', 'error')
        return
    }

    let nombreValidado = nombre.toLowerCase()

    if (jugadores.includes(nombreValidado)) {
        marcarError(inputJugador)
        mostrarMensajes(`${nombreValidado} ya está en la lista`, 'error')
        return
    }

    jugadores.push(nombreValidado)

    marcarOk(inputJugador)
    mostrarMensajes('Nombre válido', 'ok')
    añadirJugador(nombre)
})
