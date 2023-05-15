interface AudioPlayer{
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details{
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer ={
    audioVolume: 90,
    songDuration: 36,
    song: "In your eyes",
    details: {
        author: 'The Weeknd',
        year: 2020
    }
}

const song = 'New song';

// Desestructuracion de un objeto
const { song:anothersong, 
        songDuration: duration, 
        details } = audioPlayer
// Tarea de desestructuracion del detail

// Por mi
// const { details: audioDetail} = audioPlayer;
// const { author: author} = audioDetail

// Por el Profe a partir de la desestructuracion previa
const { author } = details;

// console.log('Song: ', anothersong, '- duration: ', duration);
// console.log('Duration: ', audioPlayer.songDuration);
// console.log('Author: ', audioPlayer.details.author);
// console.log('Author: ', author);

//const dbz: string[] = ['Goku', 'Vegeta', 'Trunks'];
//desestructuracion del arreglo, no necesariamente tiene que haber un nombre 
//para acceder a los otros elements de la desestructuracion
// Valor por defecto por si esas posiocn no esta en el arreglo
const [, , trunks = 'Not found']: string[] = ['Goku', 'Vegeta', 'Trunks'];

//console.log('Personaje 3:',  dbz[3] || 'Personaje no encontrado');
console.log('Personaje 3:',  trunks );


export{}