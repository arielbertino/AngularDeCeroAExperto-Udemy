import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ByCapitalPageComponent } from 'src/app/countries/pages/by-capital-page/by-capital-page.component';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  public emitValue( value: string ): void{
    this.onValue.emit( value );
  }
}
