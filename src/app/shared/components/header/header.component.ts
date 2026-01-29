import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { AppService } from '../../../core/services/app.service';
import { KeeniconComponent } from "../keenicon/keenicon.component";

@Component({
  selector: 'app-header',
  imports: [BreadcrumbComponent, KeeniconComponent],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    public appService: AppService
  ) {

  }
}
