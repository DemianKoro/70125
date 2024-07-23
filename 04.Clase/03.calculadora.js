const sumar = (numero1, numero2) => numero1+numero2;
const restar = (numero1, numero2) => numero1-numero2;
const multiplicar = (numero1, numero2) => numero1*numero2;
const dividir = (numero1, numero2) => numero1/numero2;

const realizarOperacion = (numero1, numero2, funcionCallback) =>{
    console.log("Realizo la operacion que recibi!!");
    let resultado = funcionCallback(numero1, numero2);
    console.log(`El resultado de la operacion es : ${resultado}`);

}
realizarOperacion(22,15,sumar);
realizarOperacion(21,7,dividir);

