// function mostrarLista(){

// }

// const mostrarLista = (lista) => {

//     if (lista.length === 0) {
//         return "lista vacía"
//     }
//     lista.forEach(elemento => {
//         console.log(elemento);
//     });
//     let cantElementos = lista.length;

//     return cantElementos;
// }

// let lista1 = [1, 2, 5, 88];
// let lista2 = [];
// let lista3 = [3, 7, 9];
// let lista4 = [10, 20, 30, 40, 50];

// let resultado1 = mostrarLista(lista1);
// console.log(`El largo de la lista 1 es: ${resultado1}`);

// let resultado2 = mostrarLista(lista2);
// console.log(`El largo de la lista 2 es: ${resultado2}`);

// let resultado3 = mostrarLista(lista3);
// console.log(`El largo de la lista 3 es: ${resultado3}`);

// let resultado4 = mostrarLista(lista4);
// console.log(`El largo de la lista 4 es: ${resultado4}`);


const mostrarLista = (lista) => {

    if (lista.length === 0) {
        return "lista vacía";
    }
    let cantElementos = lista.length;
    return cantElementos;
}

let lista1 = [1, 2, 5, 88];
let lista2 = [];
let lista3 = [3, 7, 9];
let lista4 = [10, 20, 30, 40, 50];

let resultado1 = mostrarLista(lista1);
console.log(`El largo de la lista 1 es: ${resultado1}`);

let resultado2 = mostrarLista(lista2);
console.log(`El largo de la lista 2 es: ${resultado2}`);

let resultado3 = mostrarLista(lista3);
console.log(`El largo de la lista 3 es: ${resultado3}`);

let resultado4 = mostrarLista(lista4);
console.log(`El largo de la lista 4 es: ${resultado4}`);
