import { CanActivateFn, Router } from '@angular/router';
// import { tokenKey } from '../constants/general';

export const authGuard: CanActivateFn = (_route, _state) => {
  // const token = localStorage.getItem(tokenKey);
  if (true) {
    return true;
  } else {
    let router = new Router();
    router.navigate(['/auth']);
    return false;
  }
};
