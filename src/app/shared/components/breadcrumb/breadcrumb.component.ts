import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter,  Subscription } from 'rxjs';
import { AppService } from '../../../core/services/app.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent implements OnInit {
  items: { label: string; link: string }[] = [];
  breadcrumbs: any[] = [];
  routerSubscription: Subscription = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute, public appService: AppService) { }

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Reinitialize breadcrumbs at each route change
        this.breadcrumbs = this.buildBreadcrumb(this.route.root);
      });
    this.breadcrumbs = this.buildBreadcrumb(this.route.root);
  }

  private buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {
    let prevBreadCrumb = [];
    let currentRoute = route;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      const routeURL: string = currentRoute.snapshot.url

        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      const breadcrumbData = currentRoute.snapshot.data['breadcrumb'];
      if (
        breadcrumbData &&
        breadcrumbData != prevBreadCrumb &&
        Array.isArray(breadcrumbData)
      ) {
        prevBreadCrumb = breadcrumbData;
        const breadcrumbSegments = breadcrumbData.map((segment) => ({
          label: segment.label,
          url: segment.url || url,
        }));
        breadcrumbs.push({ segments: breadcrumbSegments });
      }
    }

    return breadcrumbs;
  }
}
