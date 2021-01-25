const container = document.getElementById('container');
var items = generaItems();
tablero = cambiarPos(generaItems())
console.log(tablero)
var currentClick = {};
var cant_click = 0;
let elementos_click = []
let styleBoton = 'bg-purple-400  h-32  sm:w-32 lg:w-32 rounded-md flex items-center justify-center text-white text-7xl font-bold hover:bg-purple-500 '
tablero.map(symbol => {
    const boton = document.createElement('button');
    boton.setAttribute('id', symbol.id)
    boton.setAttribute('symbol', symbol.symbol)
    boton.className = styleBoton;
    container.appendChild(boton);
})

desabilitarItems()
mostrarOcultar()


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

Array.from(container.children).map(child => {
    child.addEventListener('click',  function (e) {
        
        cant_click++;
        let elemento = search(e.target.getAttribute('id'), e.target.getAttribute('symbol'));
        e.target.textContent = elemento.symbol;
        e.target.setAttribute('disabled',true);
        let item1 = e.target;
        // e.target.classList.add('animate__animated','animate__flash')

        
        
        let item2 = currentClick.target;        
        if (cant_click == 2) {
            
            desabilitarItems()
            //Si coinciden los simbolos
            if (item1.getAttribute('symbol') === item2.getAttribute('symbol')) {
                
                item1.className = styleBoton+'border-4 border-green-400' ;
                item2.className = styleBoton+'border-4 border-green-400' ;
                elementos_click.push(item1)
                elementos_click.push(item2)
                habilitarItems(elementos_click)
            } else {
            //Si no coinciden los simbolos
            
                item1.className = styleBoton+'border-4 border-red-400' ;
                item2.className = styleBoton+'border-4 border-red-400' ;
                setTimeout(()=>{
                    item1.className = styleBoton;
                    item2.className = styleBoton;
                    item1.textContent='';
                    item2.textContent='';
                    habilitarItems(elementos_click)
                },3000)
            }
            cant_click = 0;
        }
        
        currentClick = e;
    })
})

async function habilitarItems(array) {
    Array.from(container.children).map(child => {
        child.disabled = false
    })

    array.map(item =>{
        Array.from(container.children).map(child => {
            if(item.getAttribute('id')===child.getAttribute('id')){
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


function mostrarOcultar(){
    var milisecons = 2000;
    var miliseconstotal = 0;
    Array.from(container.children).map(child => {
        setTimeout(()=>{
            
            child.textContent=child.getAttribute('symbol')
        },milisecons)
        milisecons=milisecons+1000;
        miliseconstotal=miliseconstotal+milisecons
    })
    Array.from(container.children).reverse().map(child => {
        setTimeout(()=>{
           
            child.textContent=''
        },milisecons)
        milisecons=milisecons+1000;
        miliseconstotal=miliseconstotal+milisecons
    })
    console.log(miliseconstotal)
    Array.from(container.children).map(child => {
        setTimeout(()=>{
            child.disabled = false
        },26000)

    })
}



















