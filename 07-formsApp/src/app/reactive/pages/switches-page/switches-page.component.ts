import { Component } from '@angular/core';
import { CommonModule, JsonPipe as json } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``,
  standalone: true,
  imports:[
    json,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [ true, Validators.required],
    termsAndConditions: [ false, Validators.requiredTrue],
  });

  constructor(private fb: FormBuilder){}

  isValidField( field: string ){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError( field: string): string | null {
    if ( !this.myForm.controls[field] ) return null;
    const errors = this.myForm.controls[field].errors || {};
    for ( const key of Object.keys(errors) ) {
      switch (key){
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres`
      }
    }
    return null;
  }

  //ngSubmit
  onSave(){
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset(
      {
        gender: 'M',
        wantNotifications: false,
        termsAndConditions: false,
      }
    );
  }
}
