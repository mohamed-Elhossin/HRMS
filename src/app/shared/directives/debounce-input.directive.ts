import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Directive({
  selector: '[debounceInput]',
  standalone: true
})
export class DebounceInputDirective {
  @Input() debounceTime = 300;
  @Output() debounced = new EventEmitter<Event>();

  private inputSubject = new Subject<Event>();

  constructor() {
    this.inputSubject.pipe(debounceTime(this.debounceTime)).subscribe((event) => {
      this.debounced.emit(event);
    });
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    this.inputSubject.next(event);
  }
}


// <input type="text" debounceInput [debounceTime]="500" (debounced)="onSearch($event)" />
