import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomInputComponent } from "../../../../../../shared/components/custom-input/custom-input.component";
import { ValidationService } from '../../../../../../core/services/validation.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomButtonComponent } from "../../../../../../shared/components/custom-button/custom-button.component";
import { CustomSelectComponent } from '../../../../../../shared/components/custom-select/custom-select.component';
import { BasicDataService } from '../../../../../../core/services/basic-data.service';
import { ICountry } from '../../../../../../core/interfaces/country';

@Component({
  selector: 'app-account-information',
  imports: [CustomInputComponent, CustomButtonComponent, ReactiveFormsModule, CustomSelectComponent],
  templateUrl: './account-information.component.html',
  styleUrl: './account-information.component.css'
})
export class AccountInformationComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  form: FormGroup = new FormGroup({})
  apiErrors: { [key: string]: boolean } = {};

  countries: ICountry[] = []

  constructor(
    private validationService: ValidationService,
    private fb: FormBuilder,
    private basicDataService: BasicDataService
  ) {
  }

  ngOnInit(): void {
    this.getCountries();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      accountName: ['', [Validators.required]],
      contactEmail: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      position: [''],
      role: [''],
    });
  }

  onSubmit() {
    this.subscriptions.add(
    )
  }

  getErrorMessage(controlName: string, fieldName?: any): string[] | null {
    const control = this.form.get(controlName);
    const fieldErrorParts = String(controlName).split('.');
    const fieldError = fieldErrorParts[fieldErrorParts.length - 1];
    if (this.apiErrors[fieldError]) {
      control?.markAsTouched();
    }
    return control
      ? this.validationService.getErrorMessage(control, controlName, fieldName, this.apiErrors)
      : null;
  }

  getCountries() {
    this.subscriptions.add(
      this.basicDataService.getBasicData('getCountries').subscribe({
        next: (res) => {
          console.log('Countries:', res.data);
        },
        error: (err) => {
          console.error(err);
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
