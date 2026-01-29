import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IToast } from '../../core/interfaces/toast';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private toastsSubject = new BehaviorSubject<IToast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  private counter = 0;

  showToast(
  message: string,
  icon: 'success' | 'error' = 'success',
  duration: number = 3000,
  title: string = '',
  bgColor: 'white' | 'red' | 'green' = 'white',
  textColor: 'white' | 'red' | 'black' = 'white'
) {
  const id = ++this.counter;
  const newToast: IToast = {
    id,
    message,
    title,
    icon,
    duration,
    bgColor,
    textColor,
  };

  const currentToasts = this.toastsSubject.getValue();
  this.toastsSubject.next([...currentToasts, newToast]);

  if (duration > 0) {
    setTimeout(() => this.removeToast(id), duration);
  }
}

  removeToast(id: number) {
    const currentToasts = this.toastsSubject.getValue();
    this.toastsSubject.next(currentToasts?.filter(t => t.id !== id));
  }
}
