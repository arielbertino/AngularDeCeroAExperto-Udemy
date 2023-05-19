import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

// En este cado com el template html es simple (o como mucho 4 lineas)
// lo definimos aqui moismo e el archivo .ts
@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar: </h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs ..."
      (keyup.enter)="searchTag( )"
      #txtTagInput
    >
  `
})

export class SearchBoxComponent{

  // Ojo con el NotNullOperator que indica a Angular que
  // Siempre esta propiadad va a tener un valor
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService) { }

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value='';
    //console.log({newTag});

  }
}
