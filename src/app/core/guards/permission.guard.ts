import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppServices } from '../services/app.service';

export const permissionGuard: CanActivateFn = (route, state) => {
  const requiredPermission = route.data['permission'];

  const appService = inject(AppServices);
  const router = inject(Router);
  if (appService.isAccess(requiredPermission)) {
    return true;
  } else {
    router.navigate(['/not-found']);
    return false;
  }
}
