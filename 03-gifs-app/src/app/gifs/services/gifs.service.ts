import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'Kj6ZapahyBAiTFay8zpXXk7fRsppYJV7';
const SERVICE_URL = 'https://api.giphy.com/v1/gifs';
/*
api
api.giphy.com/v1/gifs/search?api_key=Kj6ZapahyBAiTFay8zpXXk7fRsppYJV7&q=halo&limit=10

*/

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifsList: Gif[] = [];

  // Att privado con su sintaxis expecifica de ts
  private _tagHistory: string[] = [];

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
  }


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
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage():void {
    if (!localStorage.getItem('history')) return

    this._tagHistory = JSON.parse( localStorage.getItem('history')! );
    if (this._tagHistory.length === 0) return

    this.searchTag(this._tagHistory[0]);
  }

  public searchTag( tag: string ):void{
    // unshift soble estructuras en ts inserta elementos
    // al inicio de la misma
    if (tag.length === 0) return

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key' , GIPHY_API_KEY )
      .set('limit' , '10' )
      .set('q' , tag );

    // Utilizamos una forma puntual de Javascrit para hacerle fetch a la peticion (a la API)
    // Per fue solo para ver el funcionamiento utiliozaremos otro metodo propio de angular como los subscriber
    //fetch('https://api.giphy.com/v1/gifs/search?api_key=Kj6ZapahyBAiTFay8zpXXk7fRsppYJV7&q=halo&limit=10')
    //  .then( resp => resp.json() )
    //  .then( data => console.log(data));

    // Ahora usando servicio http propiamente dicho
    // Asi lo sulicone yo para devuwelva la busqueda queria en el front
    //this.http.get('https://api.giphy.com/v1/gifs/search?api_key=Kj6ZapahyBAiTFay8zpXXk7fRsppYJV7&q='.concat(tag).concat('&limit=10'))
    // Asi lo resuelve el profe usando constantes variable privadas que no cambian entre otras cosas
    this.http.get<SearchResponse>(`${ SERVICE_URL }/search`, { params } )
      .subscribe( (resp) =>{
        this.gifsList = resp.data;
      });
      console.log({ gifs: this.gifsList });
  }

}
