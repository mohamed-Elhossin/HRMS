import { CustomButtonComponent } from './../../../../shared/components/custom-button/custom-button.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, TitlePageComponent, RouterModule, TranslateModule ,CustomButtonComponent  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  allowPersonalEmail: boolean = false;
  phone: string = '';
  tabs: any[] = [];

  constructor() {

  }
}
