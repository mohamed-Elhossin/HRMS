import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidationService } from '../../../../../../core/services/validation.service';
import { TranslateModule } from '@ngx-translate/core';
import { CustomButtonComponent } from '../../../../../../shared/components/custom-button/custom-button.component';
import { CustomInputComponent } from '../../../../../../shared/components/custom-input/custom-input.component';

@Component({
  selector: 'app-login-settings',
  imports: [CustomInputComponent, CustomButtonComponent, ReactiveFormsModule, TranslateModule],
  templateUrl: './login-settings.component.html',
  styleUrl: './login-settings.component.css'
})
export class LoginSettingsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  form: FormGroup = new FormGroup({})
  apiErrors: { [key: string]: boolean } = {};

  constructor(
    private validationService: ValidationService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      loginAttempts: [5, [Validators.required, Validators.min(0)]],
      authenticationAttempts: [5, [Validators.required, Validators.min(0)]],
      blockTime: [15, [Validators.required, Validators.min(0)]],
      sessionDuration: [30, [Validators.required, Validators.min(0)]],
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
