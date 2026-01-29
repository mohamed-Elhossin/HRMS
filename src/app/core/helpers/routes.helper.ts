import { Route } from '@angular/router';

export function createRoute(
  path: string,
  loadPath: string,
  componentName: string,
  breadcrumb: { label: string; url: string }[]
): Route {
  return {
    path,
    loadComponent: () =>
      import(loadPath).then((m) => m[componentName]),
    data: { breadcrumb }
  };
}
