import { Component } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  public countries : Country[] = [];


  constructor( private countryService: CountryService){}


  public searchByCapital ( term:string ): void{
    // console.log('Desde ByCapital');
    // console.log({ term });

    this.countryService.searchCapital( term )
      .subscribe( countries => {
         this.countries = countries;
    })
  }
}
