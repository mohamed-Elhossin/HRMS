import { AuthService } from './../../../core/services/auth.service';
import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { AppService } from '../../../core/services/app.service';

@Component({
  selector: 'app-header',
  imports: [BreadcrumbComponent],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    public appService: AppService,
    private authService: AuthService
  ) {

  }

  onLogout() {
    this.authService.logout();
  }
}
