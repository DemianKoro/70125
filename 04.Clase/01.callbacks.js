let valoreOriginales = [1,2,5,6,4];

 const funcionPar = (valor) => {
    if(valor%2 === 0){
        return valor
    }else {
        return "no es par"
    }  
}

let nuevoValores = valoreOriginales.map( x => x + 1 );

let nuevosValoresPares = valoreOriginales.map(funcionPar);

console.log(nuevoValores);
console.log(nuevosValoresPares);