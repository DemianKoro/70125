const objetos = [
    {
        manzanas: 3,
        peras:2,
        carne: 1,
        jugos:5,
        dulces:2
    },
    {
        manzanas: 1,
        sandias:1,
        huevos:6,
        jugos:1,
        panes:4
    }
];

const productos = [];
objetos.forEach( elemento => {
    productos.push(...Object.keys(elemento))
})
const productosUnicos = productos.reduce((acc,item)=>{ //acc -> array
    if(!acc.includes(item)){
        acc.push(item);
    }
    return acc;
}, [])

const cantProductos = [];
objetos.forEach(elemento =>{
    cantProductos.push(...Object.values(elemento))
})
console.log(cantProductos);
total = 0;
//const totalProductos = cantProductos.reduce( function(a,b){ return a + b }, 0)
const totalProductos = cantProductos.reduce( (acc,valor) => { 
    acc =  acc + valor ;
    return acc
}, 0)
console.log(productosUnicos);
console.log(totalProductos);