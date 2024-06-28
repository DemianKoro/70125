class Contador {
    constructor(responsable) {
        this.responsable = responsable;
        this.conteo = 0;
        Contador.contadorGlobal++;
    }
    static contadorGlobal = 0;
    getResponsable = () => {
        return this.responsable;
    }
    contar = () => {
        this.conteo++;
        Contador.contadorGlobal++;
    }
    getConteoIndividual = () => {
        return this.conteo;
    }
    getContadorGlobal = () => {
        return Contador.contadorGlobal;
    }
}

// Función para aplicar colores
const colorTexto = (color, texto) => `\x1b[${color}m${texto}\x1b[0m`;

// Crear instancias de Contador
const julia = new Contador("Julia"); // In 0 Gl 1 // In 0 Gl 4
const pedro = new Contador("Pedro"); // In 0 Gl 2 //In 1 Gl 3 // In 2 Gl 4

// Pedro cuenta dos veces
pedro.contar();
pedro.contar(); 

// Mostrar resultados
console.log(`📊 ${colorTexto(34, 'Conteo de Pedro')}\n${colorTexto(32, 'Individual:')} ${pedro.getConteoIndividual()} 🧮\n${colorTexto(32, 'Global:')} ${pedro.getContadorGlobal()} 🌐\n`);
console.log(`📊 ${colorTexto(34, 'Conteo de Julia')}\n${colorTexto(32, 'Individual:')} ${julia.getConteoIndividual()} 🧮\n${colorTexto(32, 'Global:')} ${julia.getContadorGlobal()} 🌐\n`);
