import { Route } from '@angular/router';

export const authChildren: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../../features/auth/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'forgot-password/:tokenId',
    loadComponent: () =>
      import('../../features/auth/pages/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: 'otp',
    loadComponent: () =>
      import('../../features/auth/pages/otp/otp.component').then(
        (m) => m.OtpComponent
      ),
  }
];
