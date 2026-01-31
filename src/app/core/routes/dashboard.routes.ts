import { Route } from '@angular/router';

export const dashboardChildren: Route[] = [
  {
    path: '',
    redirectTo: 'account-information',
    pathMatch: 'full',
  },
 
];
