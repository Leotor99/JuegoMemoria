const container = document.getElementById('container');
const mensaje = document.getElementById('mensaje')
const reiniciar = document.getElementById('reiniciar')

var items;
var tablero;

var currentClick;
var cant_click;
let elementos_click;
let styleBoton = '';
let intentos;
let aciertos;

init()

mensaje.addEventListener('click', (e) => {
    mensaje.remove()
})
reiniciar.addEventListener('click', (e) => {
    init()
    
    reiniciar.classList.add('hidden')
})




function init() {
    items = generaItems();
    tablero = cambiarPos(generaItems())
    styleBoton = 'bg-purple-400  h-32  sm:w-32 lg:w-32 rounded-md flex items-center justify-center text-white text-7xl font-bold hover:bg-purple-500 animate__animated '
    currentClick = {};
    cant_click = 0;
    elementos_click = []
    intentos = 0;
    aciertos=0;
    reiniciar.classList.add('hidden')
    mensaje.classList.add('hidden')
    rellenarTablero()
    desabilitarItems()
    mostrarOcultar()
    elementosEscuchas()
}
function rellenarTablero() {
    if(container){
        Array.from(container.children).map(child=>{
            container.removeChild(child)
        })
        
    }
    tablero.map(symbol => {
        const boton = document.createElement('button');
        boton.setAttribute('id', symbol.id)
        boton.setAttribute('symbol', symbol.symbol)
        boton.className = styleBoton;
        container.appendChild(boton);
    })
}
function generaItems() {
    let tablero = [];
    let caracter = 65;
    let indice = 0;
    for (let index = 0; index < 6; index++) {
        for (let j = 0; j < 2; j++) {
            tablero.push({
                id: indice,
                symbol: String.fromCharCode(index + caracter),
                cambiado: false
            });
            indice++;
        }

    }
    return tablero;

}
function cambiarPos(personas) {
    array_cambiado = []
    var indice = 0
    var numero;
    var generado;
    while (indice < personas.length) {

        generado = false
        while (!generado) {
            numero = generaNumeroAleatorio(0, personas.length - 1)
            if (!personas[numero].cambiado) {
                personas[numero].cambiado = true
                array_cambiado.push(personas[numero])
                generado = true;
            }
        }
        indice++
    }
    return array_cambiado
}

function search(id, symbol) {
    let resp = {};
    items.forEach(elemento => {
        if (elemento.id == id && elemento.symbol == symbol) {
            resp = elemento;
        }
    })
    return resp;

}
function generaNumeroAleatorio(minimo, maximo) {

    var num = Math.round(Math.floor(Math.random() * (minimo - (maximo + 1)) + (maximo + 1)));
    return num;
}

function elementosEscuchas(){
    Array.from(container.children).map(child => {
        child.addEventListener('click', function (e) {
    
            cant_click++;
            let elemento = search(e.target.getAttribute('id'), e.target.getAttribute('symbol'));
            e.target.textContent = elemento.symbol;
            e.target.setAttribute('disabled', true);
            let item1 = e.target;
            e.target.classList.add('animate__rubberBand')
    
    
    
            let item2 = currentClick.target;
            if (cant_click == 2) {
                intentos++
                desabilitarItems()
                //Si coinciden los simbolos
                if (item1.getAttribute('symbol') === item2.getAttribute('symbol')) {
                    aciertos++
                    item1.classList.add('border-4', 'border-green-400');
                    item2.classList.add('border-4', 'border-green-400');
                    elementos_click.push(item1)
                    elementos_click.push(item2)
                    habilitarItems(elementos_click)
                } else {
                    //Si no coinciden los simbolos
    
                    item1.classList.add('border-4', 'border-red-400');
                    item2.classList.add('border-4', 'border-red-400');
    
                    setTimeout(() => {
                        item1.className = styleBoton;
                        item2.className = styleBoton;
                        item1.textContent = '';
                        item2.textContent = '';
                        habilitarItems(elementos_click)
                    }, 3000)
                }
                cant_click = 0;
    
                if (aciertos == 6) {
                    mensaje.innerHTML = `<span class="block text-xl font-medium tracking-wide text-gray-600 uppercase"> Numero de intentos: ${intentos}</span>`
                    mensaje.classList.remove('hidden')
                    reiniciar.classList.remove('hidden')
    
                }
            }
    
            currentClick = e;
        })
    })
}

async function habilitarItems(array) {
    Array.from(container.children).map(child => {
        child.disabled = false
    })

    array.map(item => {
        Array.from(container.children).map(child => {
            if (item.getAttribute('id') === child.getAttribute('id')) {
                child.disabled = true
            }
        })
    })
}

async function desabilitarItems() {
    Array.from(container.children).map(child => {
        child.disabled = true
    })
}


async function mostrarOcultar() {
    var milisecons = 2000;
    var miliseconstotal = 0;
    Array.from(container.children).map(child => {
        setTimeout(() => {

            child.textContent = child.getAttribute('symbol')
        }, milisecons)
        milisecons = milisecons + 1000;
        miliseconstotal = miliseconstotal + milisecons
    })



    Array.from(container.children).reverse().map(child => {

        setTimeout(() => {

            child.textContent = ''
        }, milisecons)
        milisecons = milisecons + 1000;
        miliseconstotal = miliseconstotal + milisecons
    })
    console.log(miliseconstotal)
    Array.from(container.children).map(child => {
        setTimeout(() => {
            child.disabled = false
        }, 26000)

    })


}



















