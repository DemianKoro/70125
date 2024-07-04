const persona1 = {
    nombre: "Pedro",
    apellido:"Lopez",
    edad: 28
};
const persona2 = {
    nombre: "Lucia",
    apellido: "Perez",
    edad: 27
};
//spread destructuring
let { nombre, apellido } = persona2;
//console.log(nombre);
//console.log(apellido);
//rest
let persona3 = {...persona1};
persona3.nombre = "Luis";
// Pedro y Luis 
//console.log(persona1.nombre);
//console.log(persona3.nombre);
let { edad, ...nombreyapellido } = persona1;
console.log(edad);
console.log(nombreyapellido);