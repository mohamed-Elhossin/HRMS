import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { CustomInputComponent } from '../../../../shared/components/custom-input/custom-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { ParagraphComponent } from '../../../../shared/components/paragraph/paragraph.component';
import { AppService } from '../../../../core/services/app.service';
import { KeeniconComponent } from '../../../../shared/components/keenicon/keenicon.component';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

export function confirmPasswordValidator(
  newPasswordControl: AbstractControl
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    console.log(control);

    return control.value === newPasswordControl.value
      ? null
      : { confirmPassword: 'Passwords do not match' };
  };
}

@Component({
  selector: 'app-forgot-password',
  imports: [
    CardComponent,
    CustomInputComponent,
    NgxCaptchaModule,
    CustomButtonComponent,
    ReactiveFormsModule,
    TranslateModule,
    ParagraphComponent,
    KeeniconComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  form: FormGroup = new FormGroup({});
  passwordPattern: { valid: boolean; message: string }[] = [];
  siteKey: string = environment.recapchaSiteKey;
  token!: any;

  samePassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.passwordPattern = [
      {
        valid: false,
        message: 'Minimum 8 Character',
      },
      {
        valid: false,
        message: 'Include at least 1 Digit',
      },
      {
        valid: false,
        message: 'Include at least 1 Uppercase',
      },
      {
        valid: false,
        message: 'Include at least 1 Special Character',
      },
    ];
  }

  ngOnInit(): void {
    this.createForm();
    this.getTokenIdFromRoute();
  }
  getTokenIdFromRoute() {
    this.subscriptions.add(
      this.activatedRoute.queryParamMap.subscribe((params) => {
        this.token = params.get('tokenId');
        if (!this.token) {
          this.router.navigateByUrl('/auth/login');
        }
        this.form.controls['tokenID'].patchValue(this.token);
      })
    );
  }

  createForm() {
    this.form = this.fb.group(
      {
        tokenID: ['', [Validators.required]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(200),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()/\\_])[A-Za-z\d@$!%*?&()/\\_]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        recaptcha: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    const newPasswordControl = this.form.get('newPassword');
    if (newPasswordControl) {
      this.subscriptions.add(
        newPasswordControl.valueChanges.subscribe((value: string) => {
          this.passwordPattern[0].valid = value.length >= 8;
          this.passwordPattern[1].valid = /[0-9]/.test(value);
          this.passwordPattern[2].valid = /[A-Z]/.test(value);
          this.passwordPattern[3].valid = /[@$!%*?&()/\\_]/.test(value);
        })
      );
    }
  }

  handleSuccess(token: string) {
    this.form.get('recaptcha')?.setValue(token);
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ confirmPassword: 'Passwords do not match' });
      return { confirmPassword: 'Passwords do not match' };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  }
  setConfirmPasaawordValidator() {
    this.form.controls['confirmPassword'].setValidators([
      Validators.required,
      confirmPasswordValidator(this.form?.controls['newPassword']),
    ]);
    if (confirmPasswordValidator(this.form?.controls['newPassword'])) {
      this.samePassword = true;
      console.log('true', this.samePassword);
    } else {
      this.samePassword = false;
      console.log('false', this.samePassword);
    }
  }
  get newPassword() {
    return this.form.get('newPassword');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  onSubmit() {
    this.subscriptions.add();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
