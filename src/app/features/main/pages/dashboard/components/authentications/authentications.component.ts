import { Component, OnDestroy, OnInit } from '@angular/core';
 import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardComponent } from "../../../../../../shared/components/card/card.component";
import { ParagraphComponent } from "../../../../../../shared/components/paragraph/paragraph.component";
import { TranslateModule } from '@ngx-translate/core';
import { StatusBadgeComponent } from "../../../../../../shared/components/status-badge/status-badge.component";
import { CustomInputComponent } from "../../../../../../shared/components/custom-input/custom-input.component";
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';
import { ValidationService } from '../../../../../../core/services/validation.service';
import { CustomButtonComponent } from "../../../../../../shared/components/custom-button/custom-button.component";

@Component({
  selector: 'app-authentications',
  imports: [FormsModule, CardComponent, ParagraphComponent, TranslateModule, StatusBadgeComponent, CustomInputComponent, ReactiveFormsModule, CustomButtonComponent],
  templateUrl: './authentications.component.html',
  styleUrl: './authentications.component.css'
})
export class AuthenticationsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  form: FormGroup = new FormGroup({})
  apiErrors: { [key: string]: boolean } = {};

  constructor(
    private validationService: ValidationService,
    private fb: FormBuilder,
    private authService: AuthService // Assuming AuthService is injected for handling authentication-related tasks
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      emailOTP: [false],
      sms: [true],
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
  sendResetLink() {
    /**
     * Implement the logic to send a password reset link first then logout the user
     */
    this.authService.logout()
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
