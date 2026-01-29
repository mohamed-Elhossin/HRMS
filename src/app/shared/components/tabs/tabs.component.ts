import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

export interface TabItem {
  label: string;
  url: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  imports: [RouterModule,NgClass,TranslateModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {

  @Input() tabs: TabItem[] = [];

}
