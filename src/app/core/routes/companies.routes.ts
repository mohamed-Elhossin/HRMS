import { Route } from '@angular/router';

export const companiesChildren: Route[] = [
  {
    path: '',
    redirectTo: 'companies-list',
    pathMatch: 'full',
  },
  {
    path: 'companies-list',
    loadComponent: () =>
      import('../../features/main/pages/companies/components/companies-list/companies-list.component').then(
        (m) => m.CompaniesListComponent,
      ),
    data: {
      breadcrumb: [
        { label: 'Companies List', url: '/companies/companies-list' },
      ],
    },
  },
  {
    path: 'create-company',
    loadComponent: () =>
      import('../../features/main/pages/companies/components/add-company/add-company.component').then(
        (m) => m.AddCompanyComponent,
      ),
    data: {
      breadcrumb: [
        { label: 'create New Company', url: '/companies/add-company' },
      ],
    },
  },
  {
    path: 'view-company/:id',
    loadComponent: () =>
      import('../../features/main/pages/companies/components/view-company/view-company.component').then(
        (m) => m.ViewCompanyComponent,
      ),
    data: {
      breadcrumb: [{ label: 'View Company', url: '/companies/view-company' }],
    },
    children: [
      {
        path: 'departments',
        loadComponent: () =>
          import('../../features/main/pages/companies/components/get-departments/get-departments.component').then(
            (m) => m.GetDepartmentsComponent,
          ),
        data: {
          breadcrumb: [{ label: 'Departments', url: '/companies/departments' }],
        },
      },
          {
        path: 'admins',
        loadComponent: () =>
          import('../../features/main/pages/companies/components/get-admin-company/get-admin-company.component').then(
            (m) => m.GetAdminCompanyComponent,
          ),
        data: {
          breadcrumb: [{ label: 'Admins', url: '/companies/admins' }],
        },
      },
    ],
  },
];
