// Los genericos son muy poderosos y tils en el desarrollo 

export function whatsMyType<T>( argument: T ): T{
    return argument;
    // Sumamanete peligroso usra el tipo de dato 'any'
}

let amIString = whatsMyType<string>('Hola Mundo');
let amINumber = whatsMyType<number>(100);
let amIArray = whatsMyType<number[]>([1, 2, 3, 4, 5]);

console.log(amIString.split(' '));
console.log(amINumber.toFixed());
console.log(amIArray.join('-'));

