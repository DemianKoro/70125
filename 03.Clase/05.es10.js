const texto = "   Text ejemplo     ";

let procesado = '';

procesado = texto.trim(); // -> "Text ejemplo"

procesado = texto.trimStart(); // -> "Text ejemplo     "

procesado = texto.trimEnd(); // -> "   Text ejemplo"

//Flat

const arr = [ 1 , [2,4, "g"], [4, [5, 5]],5 ];

console.log(arr.flat());