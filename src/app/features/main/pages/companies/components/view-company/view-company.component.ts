import { ErrorService } from './../../../../../../shared/services/error.service';
import { AppService } from './../../../../../../core/services/app.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CompaniesService } from '../../../../../../core/services/companies.service';
 import { DatePipe } from '@angular/common';
 import { TabsComponent } from "../../../../../../shared/components/tabs/tabs.component";
import { Subscription } from 'rxjs';
import { DialogComponent } from '../../../../../../shared/components/dialog/dialog.component';
import { CustomButtonComponent } from "../../../../../../shared/components/custom-button/custom-button.component";
import { CustomInputComponent } from '../../../../../../shared/components/custom-input/custom-input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-company',
  standalone: true,
  imports: [DatePipe, TabsComponent, RouterOutlet, DialogComponent, CustomButtonComponent, CustomButtonComponent,
    CustomInputComponent, ReactiveFormsModule],
  templateUrl: './view-company.component.html',
  styleUrl: './view-company.component.css',
})
export class ViewCompanyComponent implements OnInit {
    private subscriptions = new Subscription();
      form: FormGroup = new FormGroup({});

  company: any = null;
  loading = false;
  id: string | null = null;

    tabs = [
    { label: 'Departments', url: 'departments' },
    { label: 'Employees', url: 'employees' },
    { label: 'Admins', url: 'admins' },
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companiesService: CompaniesService,
    private errorService: ErrorService,
    private ActivatedRoute: ActivatedRoute,
    public appService: AppService,
      private fb: FormBuilder,
      private ErrorService : ErrorService,
  ) {
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
  }



  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadCompany();
      } else {
        this.errorService.showToast('Company ID not found', 'error');
        this.router.navigate(['/companies']);
      }
    });
    this.createForm();
  }

  loadCompany(): void {


    this.loading = true;

    const body = { id: this.id };

    this.companiesService.getCompanies(body).subscribe({
      next: (res: any) => {
        this.company = res.Data?.Content?.[0] || null;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('❌ View Company Error:', err);
        this.loading = false;
        const message =
          err?.error?.Message ||
          err?.error?.message ||
          'Failed to load company details';
        this.errorService.showToast(message, 'error', 5000, 'Error', 'red');
        this.router.navigate(['/companies']);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/companies']);
  }



  isDialogOpen = false;

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;


  }
  createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onDialogSubmit() {

  const payload = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
companyID : this.id,
 roles: "SUPERADMIN"
    };

    this.companiesService.addAdminForCompany(payload).subscribe({
      next: (res: any) => {
        this.errorService.showToast('Admin added successfully', 'success');
        this.closeDialog();
        console.log(res);
 this.ErrorService.showToast('Admin added successfully', 'success', 5000, 'Success', 'green');
      },
      error: (err: any) => {
        const message =
          err?.error?.Message ||
          err?.error?.message ||
          'Failed to add admin';
        this.ErrorService.showToast(message, 'error', 5000, 'Error', 'red');
      },
    });
  }






  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
