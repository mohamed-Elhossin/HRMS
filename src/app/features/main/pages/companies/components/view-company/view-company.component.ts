import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsComponent } from "../../../../../../shared/components/tabs/tabs.component";

@Component({
  selector: 'app-view-company',
  imports: [RouterOutlet, TabsComponent],
  templateUrl: './view-company.component.html',
  styleUrl: './view-company.component.css'
})
export class ViewCompanyComponent {
  tabs: any[] = [];

  ngOnInit(){
    this.tabs = [
      { label: 'General Information', url: `/companies/view-company/general-information` },
      { label: 'Manage Password', url: `/companies/view-company/manage-password` },
    ];
  }
}
