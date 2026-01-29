import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitlePageComponent } from "../../../../shared/components/title-page/title-page.component";
import { TabsComponent } from "../../../../shared/components/tabs/tabs.component";
import { RouterModule } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { PersonalCardComponent } from "../../../../shared/components/personal-card/personal-card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, TitlePageComponent, TabsComponent, RouterModule, TranslateModule, PersonalCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  allowPersonalEmail: boolean = false;
  phone: string = '';
  tabs: any[] = [];

  constructor() {
    this.tabs = [
      { label: 'Account Information', url: '/dashboard/account-information' },
      { label: 'Manage Password', url: '/dashboard/manage-password' },
      { label: 'Authentications', url: '/dashboard/authentications' },
      { label: 'Linked Devices', url: '/dashboard/linked-devices' },
      { label: 'E-signature', url: '/dashboard/e-signature'  }
    ];
  }
}
