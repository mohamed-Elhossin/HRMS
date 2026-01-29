import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private langSubject = new BehaviorSubject<string>('en');
  lang$ = this.langSubject.asObservable();
  constructor() { }

  setLang(lang: string) {
    this.langSubject.next(lang);
  }

  getLang(): string {
    return this.langSubject.getValue();
  }
}
