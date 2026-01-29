import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from '../../../../../../core/services/app.service';
import { AuthService } from '../../../../../../core/services/auth.service';
import { ValidationService } from '../../../../../../core/services/validation.service';
import { TranslateModule } from '@ngx-translate/core';
import { CustomButtonComponent } from '../../../../../../shared/components/custom-button/custom-button.component';
import { CustomInputComponent } from '../../../../../../shared/components/custom-input/custom-input.component';
import { ParagraphComponent } from '../../../../../../shared/components/paragraph/paragraph.component';
import { KeeniconComponent } from "../../../../../../shared/components/keenicon/keenicon.component";

@Component({
  selector: 'app-view-manage-password',
  imports: [CustomInputComponent, CustomButtonComponent, ReactiveFormsModule, ParagraphComponent, TranslateModule, KeeniconComponent],
  templateUrl: './view-manage-password.component.html',
  styleUrl: './view-manage-password.component.css'
})
export class ViewManagePasswordComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  form: FormGroup = new FormGroup({})
  apiErrors: { [key: string]: boolean } = {};
  passwordPattern: { valid: boolean, message: string }[] = []

  constructor(
    private validationService: ValidationService,
    private fb: FormBuilder,
    public appService: AppService,
    private authService: AuthService // Assuming AuthService is injected for handling authentication-related tasks
  ) {
    this.passwordPattern = [
      {
        valid: false,
        message: 'Minimum 8 Character'
      },
      {
        valid: false,
        message: 'Include at least 1 Digit'
      },
      {
        valid: false,
        message: 'Include at least 1 Uppercase'
      },
      {
        valid: false,
        message: 'Include at least 1 Special Character'
      }
    ]
  }

  ngOnInit(): void {
    this.createForm();

  }

  createForm() {
    this.form = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(200),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()/\\_])[A-Za-z\d@$!%*?&()/\\_]{8,}$/
          ),
        ]],
      confirmPassword: ['', [Validators.required]]
    });

    const newPasswordControl = this.form.get('newPassword');
    if (newPasswordControl) {
      this.subscriptions.add(
        newPasswordControl.valueChanges.subscribe((value: string) => {
          this.passwordPattern[0].valid = value.length >= 8;
          this.passwordPattern[1].valid = /[0-9]/.test(value);
          this.passwordPattern[2].valid = /[A-Z]/.test(value);
          this.passwordPattern[3].valid = /[!@#$%^&*]/.test(value);
        })
      );
    }
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
