import { DOCUMENT, NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AppService } from '../../../core/services/app.service';
import { AuthService } from '../../../core/services/auth.service';
import { KeeniconComponent } from "../keenicon/keenicon.component";

@Component({
  selector: 'app-offcanvas',
  imports: [NgClass, KeeniconComponent],
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.css'
})
export class OffcanvasComponent {
  isOpen = false;
  isRTL = false;
  menuItemsList: any[] = []

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public appService: AppService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.detectRTL();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.close();
      });
  }

  detectRTL() {
    this.isRTL = this.document.documentElement.dir !== 'rtl';
  }

  open() {
    this.detectRTL();
    this.isOpen = true;
  }

  logout() {
    this.authService.logout();
  }

  close() {
    this.isOpen = false;
  }
}
