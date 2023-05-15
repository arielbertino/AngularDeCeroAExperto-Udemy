import { Person } from './08-clases';
export class Person {
    // Propiedades
    // public name: string;
    // private address: string;

    constructor(
        public firstName: string, 
        public lastName: string, 
        private address: string='No address'  
    ){}
}

export class Hero{

    
    constructor(
        public alterEgo: string,
        public age:number,
        public realName:string,
        public person: Person,
    ){
        // En angular no se recomienda generar una herencia
        // clases muy prolonagada, se suelen definir variables de otras clases
        // o bien usar la inyeccion de dependencias
        //super(realName, 'New York');
        //this.person = new Person(realName);
    }
};




const tony = new Person('Tony', 'Stark', 'New York');
const ironman = new Hero('Ironman', 45, 'Tony', tony);
// const ironman = new Person('Eugenio', 'Mar del Plata');

// Mecanismo de atts privados muy distinto a JAVA
// Al transpolar el codigo typescript a javascript se pierde 
// el control de acceso a los atts de la instacia
console.log(ironman);
