import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IToast } from '../../core/interfaces/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<IToast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  private counter = 0;

  showToast(
    message: string,
    type: any['type'] = 'info',
    duration: number = 3000
  ) {
    const id = ++this.counter;
    const newToast: any = { id, type, message, duration };
    const currentToasts = this.toastsSubject.getValue();
    this.toastsSubject.next([...currentToasts, newToast]);

    // Auto-remove after duration (if > 0)
    if (duration > 0) {
      setTimeout(() => this.removeToast(id), duration);
    }
  }

  removeToast(id: number) {
    const currentToasts = this.toastsSubject.getValue();
    this.toastsSubject.next(currentToasts?.filter(t => t.id !== id));
  }
}
