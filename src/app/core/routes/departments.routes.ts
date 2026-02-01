import { Route } from '@angular/router';

export const departmentsChildren: Route[] = [
  {
    path: '',
    redirectTo: 'departments-list',
    pathMatch: 'full',
  },
  {
    path: 'departments-list',
    loadComponent: () =>
      import(
        '../../features/main/pages/departments/components/department-list/department-list.component'
      ).then((m) => m.DepartmentsListComponent),
    data: {
      breadcrumb: [
        { label: 'Departments List', url: '/departments/departments-list' },
      ],
    },
  },
  {
    path: 'create-department',
    loadComponent: () =>
      import(
        '../../features/main/pages/departments/components/add-department/add-department.component'
      ).then((m) => m.AddDepartmentComponent ),
    data: {
      breadcrumb: [
        { label: 'create New Department', url: '/departments/create-department' },
      ],
    },
  },

];
