import { Component } from '@angular/core';
import { JsonPipe as json } from '@angular/common';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``,
  standalone: true,
  imports:[json]
})
export class DynamicPageComponent {

}
