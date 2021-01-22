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

var items = generaItems();
function search(id, symbol) {
    let resp = {};
    items.forEach(elemento => {
        if (elemento.id == id && elemento.symbol == symbol) {
            resp = elemento;
        }
    })
    return resp;

}

tablero = cambiarPos(generaItems())

function generaNumeroAleatorio(minimo, maximo) {

    var num = Math.round(Math.floor(Math.random() * (minimo - (maximo + 1)) + (maximo + 1)));
    return num;
}

const container = document.getElementById('container');
tablero.map(symbol => {
    const boton = document.createElement('button');
    //boton.textContent=symbol.symbol;
    boton.setAttribute('id', symbol.id)
    boton.setAttribute('symbol', symbol.symbol)
    boton.style = ' font-size:100px;';
    container.appendChild(boton);
})

var currentClick = {};
var cant_click = 0;
let elementos_click = []
console.log(tablero)

desabilitarItems()
mostrarOcultar()



Array.from(container.children).map(child => {
    child.addEventListener('click', function (e) {
        cant_click++;
        let elemento = search(e.target.getAttribute('id'), e.target.getAttribute('symbol'));
        e.target.textContent = elemento.symbol;
         e.target.setAttribute('disabled',true);
         let item1 = e.target;
         let item2 = currentClick.target;
        if (cant_click == 2) {
            desabilitarItems()
            // console.log(item1.getAttribute('id'),item2.getAttribute('id'))
            // console.log(item1.getAttribute('symbol'),item2.getAttribute('symbol'))
            if (item1.getAttribute('symbol') === item2.getAttribute('symbol')) {
                item1.style = 'border:2px solid green; font-size:100px;';
                item2.style = 'border:2px solid green; font-size:100px;';
                elementos_click.push(item1)
                elementos_click.push(item2)
                habilitarItems(elementos_click)
            } else {
                item1.style = 'border:2px solid red; font-size:100px;';
                item2.style = 'border:2px solid red; font-size:100px;';
                setTimeout(()=>{
                    item1.style = 'font-size:100px;';
                    item2.style = 'font-size:100px;';
                    item1.textContent='';
                    item2.textContent='';
                    habilitarItems(elementos_click)
                },3000)
                
            }

            console.log('ya hay dos click', item1, item2);

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



















