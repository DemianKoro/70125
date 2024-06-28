const procesarLista = (lista) => {
    if (lista.length === 0) {
        return {
            mensaje: "📭 Lista vacía",
            longitud: 0,
            suma: 0,
            promedio: 0,
            max: null,
            min: null
        };
    }

    let suma = lista.reduce((acc, val) => acc + val, 0);
    let promedio = suma / lista.length;
    let max = Math.max(...lista);
    let min = Math.min(...lista);
    let longitud = lista.length;

    return {
        mensaje: "✅ Lista procesada",
        longitud: longitud,
        suma: suma,
        promedio: promedio,
        max: max,
        min: min
    };
}

// Función para aplicar colores
const colorTexto = (color, texto) => `\x1b[${color}m${texto}\x1b[0m`;

let lista1 = [1, 2, 5, 88];
let lista2 = [];
let lista3 = [3, 7, 9];
let lista4 = [10, 20, 30, 40, 50];

let resultado1 = procesarLista(lista1);
console.log(`${colorTexto(32, 'Lista 1')} - ${resultado1.mensaje}\n📏 Cantidad de elementos: ${colorTexto(36, resultado1.longitud)}\n➕ Suma: ${colorTexto(36, resultado1.suma)}\n📊 Promedio: ${colorTexto(36, resultado1.promedio)}\n🔼 Max: ${colorTexto(36, resultado1.max)}\n🔽 Min: ${colorTexto(36, resultado1.min)}\n`);

let resultado2 = procesarLista(lista2);
console.log(`${colorTexto(32, 'Lista 2')} - ${resultado2.mensaje}\n📏 Cantidad de elementos: ${colorTexto(36, resultado2.longitud)}\n➕ Suma: ${colorTexto(36, resultado2.suma)}\n📊 Promedio: ${colorTexto(36, resultado2.promedio)}\n🔼 Max: ${colorTexto(36, resultado2.max)}\n🔽 Min: ${colorTexto(36, resultado2.min)}\n`);

let resultado3 = procesarLista(lista3);
console.log(`${colorTexto(32, 'Lista 3')} - ${resultado3.mensaje}\n📏 Cantidad de elementos: ${colorTexto(36, resultado3.longitud)}\n➕ Suma: ${colorTexto(36, resultado3.suma)}\n📊 Promedio: ${colorTexto(36, resultado3.promedio)}\n🔼 Max: ${colorTexto(36, resultado3.max)}\n🔽 Min: ${colorTexto(36, resultado3.min)}\n`);

let resultado4 = procesarLista(lista4);
console.log(`${colorTexto(32, 'Lista 4')} - ${resultado4.mensaje}\n📏 Cantidad de elementos: ${colorTexto(36, resultado4.longitud)}\n➕ Suma: ${colorTexto(36, resultado4.suma)}\n📊 Promedio: ${colorTexto(36, resultado4.promedio)}\n🔼 Max: ${colorTexto(36, resultado4.max)}\n🔽 Min: ${colorTexto(36, resultado4.min)}\n`);
