import { Component } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'dbz-main-page',
  templateUrl: './main-page.component.html'
})

export class MainPageComponent{

  constructor(
    // public dbzService: DbzService
    private dbzService: DbzService
  ){ }

  // A partir de aca comienza la solucion para mantene
  // nuestro servicio privado para mayor control y seguridad del mismo

  get characters(): Character[]{
    return [...this.dbzService.characters];
  }

  onDeleteCharacter( id: string):void{
    this.dbzService.deleteCharacterById(id);
  }

  onNewCharacter ( character: Character): void{
    this.dbzService.addCharacter(character);
  }


}

