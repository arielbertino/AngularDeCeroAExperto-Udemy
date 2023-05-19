import { Injectable } from '@angular/core';

const GIPHY_API_KEY = 'Kj6ZapahyBAiTFay8zpXXk7fRsppYJV7';
/*
api
api.giphy.com/v1/gifs/search?api_key=Kj6ZapahyBAiTFay8zpXXk7fRsppYJV7&q=halo&limit=10

*/

@Injectable({providedIn: 'root'})
export class GifsService {
  // Att privado con su sintaxis expecifica de ts
  private _tagHistory: string[] = [];


  constructor() { }

  //Getter clasico de Agular con su sintaxis especifica
  get tagsHistory(){
    // Comportamiento heredado de Javascript:
    // Pasaje por referencia de los arreglos
    // Para solventar esto usamos el operador spread ('...')
    // que este caso se usa en su comportamiento de copiar
    // lo que se le indique, otro de sus comportamientos es el
    // de concatenar objetos, muy util en diversas situaciones
    return [...this._tagHistory];
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();
    if(this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag );
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0,10);
  }


  public searchTag( tag: string ):void{
    // unshift soble estructuras en ts inserta elementos
    // al inicio de la misma

    if (tag.length > 0){
      this.organizeHistory(tag);
    }
    // Usando el mismo getter dque definimos en la clase
    console.log(this.tagsHistory);






  }

}
