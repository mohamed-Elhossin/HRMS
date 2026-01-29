import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../../shared/services/error.service';
import { langKey } from '../constants/general';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const errorService = inject(ErrorService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const res = error?.error;
      const lang = localStorage.getItem(langKey) ?? 'en';

      if (res?.errors?.length) {
        for (const err of res.errors) {
            const title = err.key || 'Error';
          const msg = err.message?.[lang] ?? 'An error occurred';

          errorService.showToast(
            msg,
            'error',
            5000,
            title,
            'red',
            'white'
          );
        }
      } else {
        const fallbackMessage =
          typeof res?.message === 'object'
            ? res.message?.[lang]
            : res?.message ?? 'An unexpected error occurred';

        errorService.showToast(
          fallbackMessage,
          'error',
          5000,
          'Error',
          'red',
          'white'
        );
      }

      return throwError(() => error);
    })
  );
};

