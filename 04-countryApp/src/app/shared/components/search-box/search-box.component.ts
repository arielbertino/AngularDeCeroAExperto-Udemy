import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  private debouncer: Subject<string> = new Subject<string>();
  // debouncerSuscription puede no existir ---> se usa el '?'
  private debouncerSuscription?: Subscription;
  @Input() public placeholder: string = '';
  @Output() public onValue = new EventEmitter<string>();
  @Output() public onDebounce = new EventEmitter<string>();
  @Input() public initialValue: string = '';

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe( debounceTime (800))
    .subscribe( (value) => {
      this.onDebounce.emit( value );
    })
  }

  ngOnDestroy(): void {
    // debouncerSuscription puede no existir ---> se usa el '?'
    // de existir, ya que es de tipo Suscrption, nos desuscribimos
    this.debouncerSuscription?.unsubscribe();
    console.log('Destrido');
  }

  public emitValue( value: string ): void{
    this.onValue.emit( value );
  }

  public onKeyPress( serchTerm: string ): void {
    this.debouncer.next(serchTerm)
    console.log('Log del onKeyPressed', serchTerm);
  }
}
