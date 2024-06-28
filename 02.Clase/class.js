class Persona{
    constructor(name, lastName){
        this.name = name;
        this.lastName = lastName;
    }
    static specie = "humano";

    saludar = () => {
        console.log(`Hola soy ${this.name}, mucho gusto`);
    }

    getName = () => {

    }

    despedir = () => {
        console.log(`${this.name} dice: Chau, nos vemos!!`);
    }
}

const juan = new Persona("Juan", "Bida");
const lucia = new Persona("Lucía", "Bicho");

juan.saludar();
lucia.despedir();
// console.log(Persona.specie);