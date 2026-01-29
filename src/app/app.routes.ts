import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { dashboardChildren } from './core/routes/dashboard.routes';
import { systemSettingsChildren } from './core/routes/system-settings.routes';
import { companiesChildren } from './core/routes/companies.routes';
import { authChildren } from './core/routes/auth.routes';

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
      // System Settings routes
      {
        path: 'system-settings',
        loadComponent: () =>
          import(
            './features/main/pages/system-settings/system-settings.component'
          ).then((m) => m.SystemSettingsComponent),
        data: {
          breadcrumb: [{ label: 'System Settings', url: '/system-settings' }],
        },
        children: [...systemSettingsChildren],
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
      // Super Admins routes
      {
        path: 'super-admins',
        loadComponent: () =>
          import(
            './features/main/pages/super-admins/super-admins.component'
          ).then((m) => m.SuperAdminsComponent),
        data: {
          breadcrumb: [{ label: 'Super Admins', url: '/super-admins' }],
        },
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
