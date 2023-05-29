import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountryService {

  private apiURL: string = 'https://restcountries.com/v3.1';

  constructor( private http: HttpClient ) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage (){
    localStorage.setItem('cacheStore',JSON.stringify( this.cacheStore ));
  }

  private loadFromLocalStorage (){
    if ( !localStorage.getItem('cacheStore') ) return
    this.cacheStore = JSON.parse (localStorage.getItem('cacheStore')!)
  }

  // Variable que sirve de 'cache' para cuando se
  // cierra la app, manteniedo los valores seleccionados
  public cacheStore: CacheStore = {
    byCapital   : { term: '', countries: [] },
    byCountries:  { term: '', countries: [] },
    byRegion    : { region: '', countries: [] },
  }

  private getCountriesRequest (url: string): Observable<Country[]>{
    return this.http.get<Country[]>( url )
    .pipe(
      catchError ( error => of([]) ),
      // delay( 2000 ) por profe
      // delay( 300 ) prueba mia, al fin y al cabo lo dejé sin delay
    );
  }

  searchCountryByAlphaCode(code:string): Observable<Country | null >{
    const url = `${ this.apiURL }/alpha/${ code }`;
    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null ),
        catchError ( () => of(null) )
      );
  }

  public searchCapital( term: string ): Observable<Country[]>{
    const url = `${ this.apiURL }/capital/${ term }`;
    // return this.http.get<Country[]>( url )
    //   .pipe(
    //      Lo que hace aca es catchear el error y retonar un
    //      arreglo vacio mediante la funcion 'of' de rxjs
    //     catchError ( () => of([]) )
    //   );
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term, countries }),
        tap( () => this.saveToLocalStorage() ),
      );

  }

  public searchCountry( term: string ): Observable<Country[]>{
    const url = `${ this.apiURL }/name/${ term }`;
    // return this.http.get<Country[]>( url )
    //   .pipe(
    //     catchError ( () => of([]) )
    //   );
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountries = { term, countries }),
      tap( () => this.saveToLocalStorage() ),
    );
  }

  public searchRegion( region: Region ): Observable<Country[]>{
    const url = `${ this.apiURL }/region/${ region }`;
    // return this.http.get<Country[]>( url )
    //   .pipe(
    //     catchError ( () => of([]) )
    //   );
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = { region, countries }),
      tap( () => this.saveToLocalStorage() ),
    );
  }

}
