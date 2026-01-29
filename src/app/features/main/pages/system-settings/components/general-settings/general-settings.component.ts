import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidationService } from '../../../../../../core/services/validation.service';
import { CustomInputComponent } from "../../../../../../shared/components/custom-input/custom-input.component";
import { CustomButtonComponent } from '../../../../../../shared/components/custom-button/custom-button.component';
import { ParagraphComponent } from "../../../../../../shared/components/paragraph/paragraph.component";
import { TranslateModule } from '@ngx-translate/core';
import { StatusBadgeComponent } from "../../../../../../shared/components/status-badge/status-badge.component";
import { CustomSelectComponent } from "../../../../../../shared/components/custom-select/custom-select.component";
import { BasicDataService } from '../../../../../../core/services/basic-data.service';
import { ICurrency } from '../../../../../../core/interfaces/currency';

@Component({
  selector: 'app-general-settings',
  imports: [CustomInputComponent, CustomButtonComponent, ReactiveFormsModule, ParagraphComponent, TranslateModule, StatusBadgeComponent, CustomSelectComponent],
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.css'
})
export class GeneralSettingsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  form: FormGroup = new FormGroup({})
  apiErrors: { [key: string]: boolean } = {};
  timeZone: { label: string, value: string }[] = [
    { label: 'UTC', value: 'UTC' },
    { label: 'GMT', value: 'GMT' },
  ]

  currencies: ICurrency[] = [];

  constructor(
    private validationService: ValidationService,
    private fb: FormBuilder,
    private basicDataService: BasicDataService,
  ) {
  }

  ngOnInit(): void {
    this.getCurrencies();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      domainName: ['',],
      administratorEmail: ['', [Validators.required]],
      timeZone: ['', [Validators.required]],
      defaultCurrency: ['', [Validators.required]],
      // registrationMethods: ['', [Validators.required]],
      // allowPersonalEmails: [false],
      // authenticationServices: [false],
    });
  }

  onSubmit() {
    this.subscriptions.add(
      // Add Api call here to submit the form
    )
  }

  onCancel() {
    // reset the form with the original values from api or initial state
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

  getCurrencies() {
    this.subscriptions.add(
      this.basicDataService.getBasicData('getCurrencies').subscribe({
        next(value) {
          console.log(value);
        },
        error(err) {
          console.error(err);
        }
      })
    )
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
