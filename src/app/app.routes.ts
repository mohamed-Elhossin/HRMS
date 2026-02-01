import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { dashboardChildren } from './core/routes/dashboard.routes';
 import { companiesChildren } from './core/routes/companies.routes';
import { authChildren } from './core/routes/auth.routes';
import { departmentsChildren } from './core/routes/departments.routes';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [authGuard],
    component: MainLayoutComponent,
    data: {
      breadcrumb: [{ label: 'Approval System', url: '/' }],
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      // Dashboard routes
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/main/pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: {
          breadcrumb: [{ label: 'Dashboard', url: '/' }],
        },
        children: [...dashboardChildren],
      },

      // Companies routes
      {
        path: 'companies',
        loadComponent: () =>
          import('./features/main/pages/companies/companies.component').then(
            (m) => m.CompaniesComponent
          ),
        data: {
          breadcrumb: [{ label: 'Companies', url: '/companies' }],
        },
        children: [...companiesChildren],
      },

      // departments routes
         {
        path: 'departments',
        loadComponent: () =>
          import('./features/main/pages/departments/departments.component').then(
            (m) => m.DepartmentsComponent
          ),
        data: {
          breadcrumb: [{ label: 'Departments', url: '/departments' }],
        },
        children: [...departmentsChildren],
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [...authChildren],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
