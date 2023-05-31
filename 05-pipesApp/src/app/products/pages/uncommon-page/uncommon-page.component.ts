import { Component } from '@angular/core';
import { Observable, interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrls: ['./uncommon-page.component.css']
})
export class UncommonPageComponent {
  // i18n Select
  public name: string = 'Ariel';
  public gender: 'male' | 'female' = 'male';
  public invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  }

  public changeClient(){
    if (this.name === 'Ariel'){
      this.name = 'Milagros';
      this.gender = 'female';
    }
    else {
      this.name = 'Ariel';
      this.gender = 'male';
    }
  }

  // i18n Plural
  public clients: string[] = ['Lucia', 'Milagros', 'Carolina', 'Adriana', 'Ariel', 'Maria', 'Ezequiel', 'Marcelo', 'Choni', 'Albierzo']
  public clientsMap = {
    '=0': 'no tenemos ningun clientes esperando.',
    '=1': 'tenemos un cliente esperando.',
    '=2': 'tenemos 2 personas esperando.',
    'other': 'tenemos # clientes esperando.',
  }

  public deleteClient(){
    this.clients.shift();
  }

  // KeyValue Pipe
  public person = {
    name:'Ariel',
    age:'29',
    address:'Tandil, Buenos Aires',
  }

  // Asyc Pipe
  public myObservableTimer: Observable<number> = interval(2000).pipe(
    tap( value => console.log('tap:', value) )
  );

  public promiseValue: Promise<string> = new Promise((resolve, reject )=> {
    setTimeout( () => {
      resolve('Tenemos data en la promesa.'),
      console.log('Tenemos data en la promesa.');
      this.person.name = 'Montoto';
    }, 3500);
  });
}
