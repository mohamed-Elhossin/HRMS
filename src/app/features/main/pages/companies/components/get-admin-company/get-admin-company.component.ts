 import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { CompaniesService } from '../../../../../../core/services/companies.service';
import { ErrorService } from '../../../../../../shared/services/error.service';
import { Subscription } from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';

@Component({
  selector: 'app-get-admin-company',
  imports: [TableComponent],
  templateUrl: './get-admin-company.component.html',
  styleUrl: './get-admin-company.component.css'
})
export class GetAdminCompanyComponent {

  private subscriptions = new Subscription();
  loading = false;
  departmentsData: any[] = [];
  constructor(
    private companiesService: CompaniesService,
    private errorService: ErrorService,
  ) {}
  columns = [
    { key: 'index', label: '#', custom: true, templateKey: 'indexTemplate' },
      { key: 'name', label: '  Name', custom: true, templateKey: 'usertName' },
      { key: 'email', label: '  Email', custom: true, templateKey: 'userEmail' },
  ];
  @ViewChild('indexTemplate', { static: true }) indexTemplate!: TemplateRef<any>;
  @ViewChild('usertName', { static: true }) usertName!: TemplateRef<any>;
  @ViewChild('userEmail', { static: true }) userEmail!: TemplateRef<any>;
  @Input() companyId: string | null = null;
  customTemplates: { [key: string]: TemplateRef<any> } = {};

  ngOnInit(): void {
    this.loadCompanies();
  }
    initTemplates(): void {
    this.customTemplates = {
      indexTemplate: this.indexTemplate,
      usertName: this.usertName,
      userEmail: this.userEmail,
    };
  }
 loadCompanies(): void {
  this.loading = true;

  const body: any = { companyID: this.companyId };

  this.subscriptions.add(
    this.companiesService.getCompanyAdmins(body).subscribe({
      next: (res: any) => {
        const raw = res.data || res.Data?.Content || [];


        this.departmentsData = raw.map((item: any, index: number) => ({
          ...item,
          index: index + 1,
        }));

        this.loading = false;
      },
      error: (err: any) => {
        console.error('❌ API Error:', err);
        this.loading = false;
        const message =
          err?.error?.Message ||
          err?.error?.message ||
          'Failed to load companies';
        this.errorService.showToast(message, 'error', 5000, 'Error', 'red');
      },
    }),
  );
}



  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
