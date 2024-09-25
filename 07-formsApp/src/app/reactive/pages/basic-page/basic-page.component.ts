import { Component } from '@angular/core';
import { JsonPipe as json } from '@angular/common';
@Component({
  templateUrl: './basic-page.component.html',
  styles: ``,
  standalone: true,
  imports:[json]
})
export class BasicPageComponent {

}
