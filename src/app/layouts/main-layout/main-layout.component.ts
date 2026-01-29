import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { HeaderComponent } from "../../shared/components/header/header.component";
import { SidebarService } from '../../shared/services/sidebar.service';
// import { AsyncPipe, NgClass } from '@angular/common';
// import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [RouterOutlet, SidebarComponent,  HeaderComponent],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  constructor(
    public sidebarService: SidebarService
  ) {
  }
}
