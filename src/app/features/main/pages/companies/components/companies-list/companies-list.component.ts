import { Component, OnDestroy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomInputComponent } from '../../../../../../shared/components/custom-input/custom-input.component';
import { CustomButtonComponent } from '../../../../../../shared/components/custom-button/custom-button.component';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { TitlePageComponent } from '../../../../../../shared/components/title-page/title-page.component';
import { CompaniesService } from '../../../../../../core/services/companies.service';
import { ErrorService } from '../../../../../../shared/services/error.service';

@Component({
  selector: 'app-companies-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CustomInputComponent,
    CustomButtonComponent,
    TableComponent,
    TitlePageComponent,
  ],
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.css',
})
export class CompaniesListComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  loading = false;
  companiesData: any[] = [];
  companiesDataWithIndex: any[] = []; // 👈 للترقيم

  columns = [
    { key: 'index', label: '#', custom: true, templateKey: 'indexTemplate' },
    { key: 'name', label: 'Company Name', custom: true, templateKey: 'companyNameTemplate' },
    { key: 'phone', label: 'Phone', custom: true, templateKey: 'phoneTemplate' },
    { key: 'email', label: 'Business Email', custom: true, templateKey: 'emailTemplate' },
    { key: 'sector', label: 'Sector', custom: true, templateKey: 'packageTemplate' },
    { key: 'country', label: 'Location', custom: true, templateKey: 'countryTemplate' },
  ];

  customTemplates: { [key: string]: TemplateRef<any> } = {};

  @ViewChild('indexTemplate', { static: true }) indexTemplate!: TemplateRef<any>;
  @ViewChild('companyNameTemplate', { static: true }) companyNameTemplate!: TemplateRef<any>;
  @ViewChild('phoneTemplate', { static: true }) phoneTemplate!: TemplateRef<any>;
  @ViewChild('emailTemplate', { static: true }) emailTemplate!: TemplateRef<any>;
  @ViewChild('packageTemplate', { static: true }) packageTemplate!: TemplateRef<any>;
  @ViewChild('countryTemplate', { static: true }) countryTemplate!: TemplateRef<any>;

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private companiesService: CompaniesService,
    private errorService: ErrorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createSearchForm();
    this.initTemplates();
    this.loadCompanies();
  }

  createSearchForm(): void {
    this.searchForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl(''),
    });
  }

  initTemplates(): void {
    this.customTemplates = {
      indexTemplate: this.indexTemplate,
      companyNameTemplate: this.companyNameTemplate,
      phoneTemplate: this.phoneTemplate,
      emailTemplate: this.emailTemplate,
      packageTemplate: this.packageTemplate,
      countryTemplate: this.countryTemplate,
    };
  }

  loadCompanies(): void {
    this.loading = true;

    console.log('🔍 Search Payload:', this.searchForm.value);

    const { id, name } = this.searchForm.value;
    const body: any = {};

    if (id?.trim()) {
      body.id = id.trim();
    }
    if (name?.trim()) {
      body.name = name.trim();
    }

    console.log('📤 Final API Body:', body);

    this.subscriptions.add(
      this.companiesService.getCompanies(body).subscribe({
        next: (res: any) => {
          console.log('📥 API Response:', res);
          this.companiesData = res.data || res.Data?.Content || [];
          this.updateDataWithIndex();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('❌ API Error:', err);
          this.loading = false;
          const message = err?.error?.Message || err?.error?.message || 'Failed to load companies';
          this.errorService.showToast(message, 'error', 5000, 'Error', 'red');
        },
      })
    );
  }

  private updateDataWithIndex(): void {
    this.companiesDataWithIndex = this.companiesData.map((company, index) => ({
      ...company,
      index: index + 1,
    }));
  }

  onSearch(): void {
    console.log('🔍 onSearch clicked, form value:', this.searchForm.value);
    this.loadCompanies();
  }

  onReset(): void {
    this.searchForm.reset();
    this.loadCompanies();
  }

  navigateToCreate(): void {
    this.router.navigate(['/companies/create-company']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
