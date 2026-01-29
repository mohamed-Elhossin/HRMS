import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { CustomInputComponent } from "../../../../../../shared/components/custom-input/custom-input.component";
import { CustomButtonComponent } from "../../../../../../shared/components/custom-button/custom-button.component";
import { TableComponent } from "../../../../../../shared/components/table/table.component";
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-linked-devices',
  imports: [CustomInputComponent, CustomButtonComponent,
    TableComponent, TranslateModule],
  templateUrl: './linked-devices.component.html',
  styleUrl: './linked-devices.component.css'
})
export class LinkedDevicesComponent  implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  loading: boolean = true;
  customTemplates: { [key: string]: TemplateRef<any> } = {};
  columns: any = []
  data: any[] = []

  @ViewChild('ipAddressTemplate', { static: true }) ipAddressTemplate!: TemplateRef<any>;
  @ViewChild('dateTemplate', { static: true }) dateTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate', { static: true }) statusTemplate!: TemplateRef<any>;
  @ViewChild('actionTemplate', { static: true }) actionTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.columns = [
      { key: 'ipAddress', label: 'IP Address', type: 'text', templateKey: 'ipAddressTemplate', custom: true },
      { key: 'browser', label: 'Browser', type: 'text' },
      { key: '', label: 'Date', type: 'date', templateKey: 'dateTemplate', custom: true },
      { key: '', label: 'Action', type: 'text', templateKey: 'actionTemplate', custom: true },
    ];

    setTimeout(() => {
      this.data = [
        {
          id: '1',
          ipAddress: '10.20.365.3666',
          country: 'Saudi Jeddah',
          browser: 'Google Chrome',
          date: '1/20/2025',
          time: '02:00 PM',
        },
        {
          id: '2',
          ipAddress: '10.20.365.3667',
          country: 'Saudi Jeddah',
          browser: 'Safari',
          date: '1/20/2025',
          time: '02:00 PM',
        },
        {
          id: '3',
          ipAddress: '10.25.36.214',
          country: 'Saudi Jeddah',
          browser: 'Microsoft Edge',
          date: '1/20/2025',
          time: '02:00 PM',
        },

      ];
      this.loading = false;
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.customTemplates['ipAddressTemplate'] = this.ipAddressTemplate;
    this.customTemplates['dateTemplate'] = this.dateTemplate;
    this.customTemplates['actionTemplate'] = this.actionTemplate;
  }


  onRevokeAll(){
    // Revoke all Sessions api
  }

  onRevokeSession(sessionId:any){
    // Revoke Session by Id
    console.log(sessionId);
  }

    ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
