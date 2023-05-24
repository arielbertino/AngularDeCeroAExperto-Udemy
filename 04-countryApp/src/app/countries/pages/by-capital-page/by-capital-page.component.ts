import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { CacheStore } from '../../interfaces/cache-store.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {
  public countries : Country[] = [];
  public isLoading : boolean = false;
  public initialValue : string = '';

  constructor( private countryService: CountryService){}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCapital.countries;
    this.initialValue = this.countryService.cacheStore.byCapital.term;
  }

  public searchByCapital ( term:string ): void{
    // console.log('Desde ByCapital');
    // console.log({ term });
    this.isLoading = true;
    this.countryService.searchCapital( term )
    .subscribe( countries => {
      this.countries = countries.sort();
      this.isLoading = false;
    })

  }
}
