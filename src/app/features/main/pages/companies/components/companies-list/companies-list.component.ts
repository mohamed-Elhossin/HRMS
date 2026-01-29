import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableComponent } from "../../../../../../shared/components/table/table.component";
import { Subscription } from 'rxjs';
import { StatusBadgeComponent } from "../../../../../../shared/components/status-badge/status-badge.component";
import { CustomButtonComponent } from "../../../../../../shared/components/custom-button/custom-button.component";
import { Router, RouterModule } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-companies-list',
  imports: [TableComponent, StatusBadgeComponent, CustomButtonComponent, RouterModule, TitleCasePipe, TranslateModule],
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.css'
})
export class CompaniesListComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private router:Router){}

  private subscription: Subscription = new Subscription();

  loading: boolean = true;
  customTemplates: { [key: string]: TemplateRef<any> } = {};
  columns: any = []
  data: any[] = []
  statusOptions: any[] = []

  @ViewChild('companyNameTemplate', { static: true }) companyNameTemplate!: TemplateRef<any>;
  @ViewChild('emailTemplate', { static: true }) emailTemplate!: TemplateRef<any>;
  @ViewChild('packageTemplate', { static: true }) packageTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate', { static: true }) statusTemplate!: TemplateRef<any>;
  @ViewChild('creationDateTemplate', { static: true }) creationDateTemplate!: TemplateRef<any>;
  @ViewChild('countryTemplate', { static: true }) countryTemplate!: TemplateRef<any>;
  @ViewChild('actionTemplate', { static: true }) actionTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.columns = [
      { key: 'name', label: 'Name', type: 'text', templateKey: 'companyName', custom: true },
      { key: 'email', label: 'Business Email', type: 'text', templateKey: 'email', custom: true },
      { key: 'packageName', label: 'Package', type: 'text', templateKey: 'package', custom: true },
      { key: 'status', label: 'Account Status', type: 'date', templateKey: 'status', custom: true },
      { key: 'createdAt', label: 'Creation Date', type: 'date', templateKey: 'creationDate', custom: true },
      { key: 'country', label: 'Country', type: 'date', templateKey: 'country', custom: true },
      { key: 'action', label: 'Action', type: 'date', templateKey: 'action', custom: true },
    ];

    setTimeout(() => {
      this.data = [
        {
          id: '1',
          name: 'Ramy Salem',
          code: 'ID# 1',
          email: 'it@swalac.com',
          emailStatus: 'verified',
          packageName: 'diamond',
          accountStatus: 'active',
          createdAt: '1/20/2025',
          createdBy: 'Ahmed Samy',
          country: 'Saudi Arabia',
          city: 'Jeddah',
        },
        {
          id: '2',
          name: 'IFAS',
          code: 'ID# 1',
          email: 'it@gg.com',
          emailStatus: 'verified',
          packageName: 'trial',
          accountStatus: 'active',
          createdAt: '1/20/2025',
          createdBy: 'Ramy Salem',
          country: 'Saudi Arabia',
          city: 'Jeddah',
        }
      ];
      this.loading = false;
    }, 1000);

  }

  ngAfterViewInit(): void {
    this.customTemplates['companyName'] = this.companyNameTemplate;
    this.customTemplates['email'] = this.emailTemplate;
    this.customTemplates['package'] = this.packageTemplate;
    this.customTemplates['status'] = this.statusTemplate;
    this.customTemplates['creationDate'] = this.creationDateTemplate;
    this.customTemplates['country'] = this.countryTemplate;
    this.customTemplates['action'] = this.actionTemplate;
  }

  blockAccount(id:any){
    console.log(id);

  }

  navigateByUrl(location:string){
    this.router.navigateByUrl(location)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
