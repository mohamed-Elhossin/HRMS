import { Route } from '@angular/router';

export const systemSettingsChildren: Route[] = [
  {
    path: '',
    redirectTo: 'general',
    pathMatch: 'full',
  },
  {
    path: 'general',
    loadComponent: () =>
      import(
        '../../features/main/pages/system-settings/components/general-settings/general-settings.component'
      ).then((m) => m.GeneralSettingsComponent),
    data: {
      breadcrumb: [
        { label: 'General Settings', url: '/system-settings/general' },
      ],
    },
  },
  {
    path: 'login-settings',
    loadComponent: () =>
      import(
        '../../features/main/pages/system-settings/components/login-settings/login-settings.component'
      ).then((m) => m.LoginSettingsComponent),
    data: {
      breadcrumb: [
        {
          label: 'Login Settings',
          url: '/system-settings/login-settings',
        },
      ],
    },
  },
  {
    path: 'authentications',
    loadComponent: () =>
      import(
        '../../features/main/pages/system-settings/components/authentications/authentications.component'
      ).then((m) => m.AuthenticationsComponent),
    data: {
      breadcrumb: [
        { label: 'Authentications', url: '/system-settings/authentications' },
      ],
    },
  },
  {
    path: 'super-users',
    loadComponent: () =>
      import(
        '../../features/main/pages/system-settings/components/super-users/super-users.component'
      ).then((m) => m.SuperUsersComponent),
    data: {
      breadcrumb: [
        { label: 'Super Users', url: '/system-settings/super-users' },
      ],
    },
  },
  {
    path: 'logs-settings',
    loadComponent: () =>
      import(
        '../../features/main/pages/system-settings/components/logs-settings/logs-settings.component'
      ).then((m) => m.LogsSettingsComponent),
    data: {
      breadcrumb: [
        { label: 'Logs', url: '/system-settings/logs-settings' },
      ],
    },
  },
];
