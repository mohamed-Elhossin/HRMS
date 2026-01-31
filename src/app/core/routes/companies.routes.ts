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
      import(
        '../../features/main/pages/companies/components/companies-list/companies-list.component'
      ).then((m) => m.CompaniesListComponent),
    data: {
      breadcrumb: [
        { label: 'Companies List', url: '/companies/companies-list' },
      ],
    },
  },
  {
    path: 'create-company',
    loadComponent: () =>
      import(
        '../../features/main/pages/companies/components/add-company/add-company.component'
      ).then((m) => m.AddCompanyComponent),
    data: {
      breadcrumb: [
        { label: 'create New Company', url: '/companies/add-company' },
      ],
    },
  },
  {
    path: 'view-company',
    loadComponent: () =>
      import(
        '../../features/main/pages/companies/components/view-company/view-company.component'
      ).then((m) => m.ViewCompanyComponent),
    data: {
      breadcrumb: [
        { label: 'Company Profile', url: '/companies/view-company' },
      ],
    },
    children: [
      {
        path: '',
        redirectTo:'general-information',
        pathMatch:'full'
      },
      {
        path: 'general-information',
        loadComponent: () =>
          import(
            '../../features/main/pages/companies/components/view-general-information/view-general-information.component'
          ).then((m) => m.ViewGeneralInformationComponent),
        // data: {
        //   breadcrumb: [
        //     { label: 'General Information', url: '/companies/view-company/general-information' },
        //   ],
        // },
      },

    ],
  },
];
