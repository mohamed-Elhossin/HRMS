import { EmployeesService } from './../../../../../../core/services/employees.service';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
 import { Subscription } from 'rxjs';
import { ErrorService } from '../../../../../../shared/services/error.service';
import { TableComponent } from '../../../../../../shared/components/table/table.component';

@Component({
  selector: 'app-employees-company',
  imports: [TableComponent],
  templateUrl: './employees-company.component.html',
  styleUrl: './employees-company.component.css'
})
export class EmployeesCompanyComponent {
  private subscriptions = new Subscription();
  loading = false;
  departmentsData: any[] = [];
  constructor(
    private employeesService: EmployeesService,
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
    this.employeesService.getEmployees(body).subscribe({
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
