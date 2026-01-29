import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
private dropdownToggles = new Subject<string | null>();
  dropdownToggles$ = this.dropdownToggles.asObservable();

  toggle(id: string) {
    this.dropdownToggles.next(id);
  }

  closeAll() {
    this.dropdownToggles.next(null);
  }
}
