import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Output()
  public onDelete: EventEmitter<string> = new EventEmitter();


  @Input()
  public characterList: Character[] = [
    {
      id: uuid(),
      name: 'Trunks',
      power: 10,
    }
  ]

  // Mi solucion al ejercicio de emitir el id de character
  deleteCharacterById(id : string | undefined):void{
  //solucion del profesor para la emision de id del character
  // deleteCharacterById(id? : string | undefined):void{
    //solucion del profesor para la emision de id del character
    // if( !id ) return
    this.onDelete.emit(id);
  }
}
