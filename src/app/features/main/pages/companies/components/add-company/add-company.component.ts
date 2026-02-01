import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { RouterLink, Router } from '@angular/router';

import { CustomInputComponent } from '../../../../../../shared/components/custom-input/custom-input.component';
import { CustomButtonComponent } from '../../../../../../shared/components/custom-button/custom-button.component';
import { ErrorService } from '../../../../../../shared/services/error.service';
import { CompaniesService } from '../../../../../../core/services/companies.service';
import { FileUploadComponent } from '../../../../../../shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-add-company',
  imports: [
    CustomInputComponent,
    CustomButtonComponent,
    ReactiveFormsModule,
    RouterLink,
    FileUploadComponent,
  ],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.css',
})
export class AddCompanyComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private errorService: ErrorService,
    private companiesService: CompaniesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      country: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      agree: [false, [Validators.requiredTrue]],
    });
  }
  // في AddCompanyComponent
  // في AddCompanyComponent class
  logoFile: File | null = null;
  logoPreviewUrl: string = '';

  onLogoChange(file: File | null): void {
    if (file) {
      this.logoFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoPreviewUrl = e.target.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.logoFile = null;
      this.logoPreviewUrl = '';
    }
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || !this.logoFile) {
      this.errorService.showToast(
        !this.logoFile
          ? 'Please upload company logo'
          : 'Please fill all required fields',
        'error',
        5000,
        'Validation Error',
        'red',
      );
      return;
    }

     const payload = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      address: this.form.value.address,
      city: this.form.value.city,
      state: this.form.value.state,
      zip: this.form.value.zip,
      country: this.form.value.country,
      sector: this.form.value.sector,
    };

     const formData = new FormData();
    formData.append('data', JSON.stringify(payload));
    formData.append('logo', this.logoFile as Blob, this.logoFile!.name);

    this.subscriptions.add(
      this.companiesService.createCompany(formData).subscribe({
        next: () => {
          this.errorService.showToast(
            'Company created successfully',
            'success',
            5000,
            'Success',
            'green',
          );
          this.router.navigate(['/companies/companies-list']);
        },
        error: (err: any) => {
          let message = 'Something went wrong while creating company';

          if (err?.error?.Error && Array.isArray(err.error.Error)) {
            const errors = err.error.Error.map(
              (e: any) => e.details || e.message || 'Unknown error',
            );
            message = errors.join(', ');
          } else if (err?.error?.Message) {
            message = err.error.Message;
          } else if (err?.error?.message) {
            message = err.error.message;
          }

          this.errorService.showToast(message, 'error', 7000, 'Error', 'red');
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
