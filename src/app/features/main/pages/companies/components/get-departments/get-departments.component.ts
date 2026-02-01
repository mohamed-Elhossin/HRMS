import { Component, Input,  OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from '../../../../../../shared/services/error.service';
import { CompaniesService } from '../../../../../../core/services/companies.service';
import { TableComponent } from '../../../../../../shared/components/table/table.component';

@Component({
  selector: 'app-get-departments',
  imports: [  TableComponent,],
  templateUrl: './get-departments.component.html',
  styleUrl: './get-departments.component.css',
})
export class GetDepartmentsComponent implements OnInit {
  private subscriptions = new Subscription();
  loading = false;
  departmentsData: any[] = [];
  constructor(
    private companiesService: CompaniesService,
    private errorService: ErrorService,
  ) {}
  columns = [
    { key: 'index', label: '#', custom: true, templateKey: 'indexTemplate' },
    { key: 'name', label: '  Name', custom: true, templateKey: 'departmentName' },
  ];
  @ViewChild('indexTemplate', { static: true }) indexTemplate!: TemplateRef<any>;
  @ViewChild('departmentName', { static: true }) departmentName!: TemplateRef<any>;

  @Input() companyId: string | null = null;
  customTemplates: { [key: string]: TemplateRef<any> } = {};

  ngOnInit(): void {
    this.loadCompanies();
  }
    initTemplates(): void {
    this.customTemplates = {
      indexTemplate: this.indexTemplate,
      departmentName: this.departmentName,

    };
  }
 loadCompanies(): void {
  this.loading = true;

  const body: any = { companyID: this.companyId };

  this.subscriptions.add(
    this.companiesService.getDepartmentByCompanyId(body).subscribe({
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
