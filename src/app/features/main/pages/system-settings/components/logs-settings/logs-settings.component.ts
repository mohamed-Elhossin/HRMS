import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableComponent } from "../../../../../../shared/components/table/table.component";
import { KeeniconComponent } from "../../../../../../shared/components/keenicon/keenicon.component";
import { CustomSelectComponent } from "../../../../../../shared/components/custom-select/custom-select.component";

@Component({
  selector: 'app-logs-settings',
  imports: [TableComponent, KeeniconComponent, CustomSelectComponent],
  templateUrl: './logs-settings.component.html',
  styleUrl: './logs-settings.component.css'
})
export class LogsSettingsComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  loading: boolean = true;
  customTemplates: { [key: string]: TemplateRef<any> } = {};
  columns: any = []
  data: any[] = []
  status: { label: string, value: string }[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ]

  @ViewChild('countryTemplate', { static: true }) countryTemplate!: TemplateRef<any>;
  @ViewChild('actionTemplate', { static: true }) actionTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.columns = [
      { key: 'ip', label: 'ip', type: 'text' },
      { key: 'email', label: 'Business Email', type: 'text' },
      { key: 'os', label: 'os', type: 'text' },
      { key: 'browsers', label: 'Browsers', type: 'text' },
      { key: 'deviceName', label: 'Device Name', type: 'text' },
      { key: 'country', label: 'Country', type: 'date', templateKey: 'country', custom: true },
      { key: 'action', label: 'Action', type: 'date', templateKey: 'action', custom: true },
    ];

    setTimeout(() => {
      this.data = [
        {
          id: '1',
          ip: '10.10.5.1',
          code: 'ID# 1',
          email: 'it@swalac.com',
          emailStatus: 'verified',
          os: 'Windows',
          browsers: 'Edge',
          deviceName: 'Ahmed Samy',
          country: 'Saudi Arabia',
          city: 'Jeddah',
        }
      ];
      this.loading = false;
    }, 1000);

  }

  ngAfterViewInit(): void {
    this.customTemplates['country'] = this.countryTemplate;
    this.customTemplates['action'] = this.actionTemplate;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
