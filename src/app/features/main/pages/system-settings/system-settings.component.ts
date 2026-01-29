import { Component } from '@angular/core';
import { TitlePageComponent } from "../../../../shared/components/title-page/title-page.component";
import { TabsComponent } from "../../../../shared/components/tabs/tabs.component";
import { RouterModule } from "@angular/router";
import { CustomButtonComponent } from "../../../../shared/components/custom-button/custom-button.component";

@Component({
  selector: 'app-system-settings',
  imports: [TitlePageComponent, TabsComponent, RouterModule, CustomButtonComponent],
  templateUrl: './system-settings.component.html',
  styleUrl: './system-settings.component.css'
})
export class SystemSettingsComponent {
  tabs: any[] = [];

  constructor() {
    this.tabs = [
      { label: 'General Settings', url: '/system-settings/general' },
      { label: 'Login Settings', url: '/system-settings/login-settings' },
      { label: 'Authentications', url: '/system-settings/authentications' },
      { label: 'Super Users', url: '/system-settings/super-users' },
      { label: 'Logs', url: '/system-settings/logs-settings' },
    ];
  }

}
