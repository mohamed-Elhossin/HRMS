import { Route } from '@angular/router';

export const dashboardChildren: Route[] = [
  {
    path: '',
    redirectTo: 'account-information',
    pathMatch: 'full',
  },
  {
    path: 'account-information',
    loadComponent: () =>
      import(
        '../../features/main/pages/dashboard/components/account-information/account-information.component'
      ).then((m) => m.AccountInformationComponent),
    data: {
      breadcrumb: [
        {
          label: 'Account Information',
          url: '/dashboard/account-information',
        },
      ],
    },
  },
  {
    path: 'manage-password',
    loadComponent: () =>
      import(
        '../../features/main/pages/dashboard/components/manage-password/manage-password.component'
      ).then((m) => m.ManagePasswordComponent),
    data: {
      breadcrumb: [
        { label: 'Manage Password', url: '/dashboard/manage-password' },
      ],
    },
  },
  {
    path: 'authentications',
    loadComponent: () =>
      import(
        '../../features/main/pages/dashboard/components/authentications/authentications.component'
      ).then((m) => m.AuthenticationsComponent),
    data: {
      breadcrumb: [
        { label: 'Authentications', url: '/dashboard/authentications' },
      ],
    },
  },
  {
    path: 'linked-devices',
    loadComponent: () =>
      import(
        '../../features/main/pages/dashboard/components/linked-devices/linked-devices.component'
      ).then((m) => m.LinkedDevicesComponent),
    data: {
      breadcrumb: [
        { label: 'Linked Devices', url: '/dashboard/linked-devices' },
      ],
    },
  },
  {
    path: 'e-signature',
    loadComponent: () => import('../../features/main/pages/dashboard/components/e-signature/e-signature.component').then(m => m.ESignatureComponent),
    data: {
      breadcrumb: [{ label: 'E-signature', url: '/dashboard/e-signature' }],
    }
  },
];
