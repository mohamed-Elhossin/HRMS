import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private collapsed$ = new BehaviorSubject<boolean>(this.getInitialState());

  private getInitialState(): boolean {
    return localStorage.getItem('sidebar:minimized') === 'true';
  }

  toggle() {
    const newValue = !this.collapsed$.value;
    localStorage.setItem('sidebar:minimized', String(newValue));
    this.collapsed$.next(newValue);
  }

  isCollapsed$() {
    return this.collapsed$.asObservable();
  }

  getCurrentState() {
    return this.collapsed$.value;
  }
}
