import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomInputComponent } from '../../../../../../shared/components/custom-input/custom-input.component';
import { CustomSelectComponent } from '../../../../../../shared/components/custom-select/custom-select.component';
import { AppService } from '../../../../../../core/services/app.service';
import { TranslateModule } from '@ngx-translate/core';
import { CustomButtonComponent } from '../../../../../../shared/components/custom-button/custom-button.component';
import { ParagraphComponent } from '../../../../../../shared/components/paragraph/paragraph.component';
import { ValidationService } from '../../../../../../core/services/validation.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { KeeniconComponent } from '../../../../../../shared/components/keenicon/keenicon.component';
import { PasswordGeneratorService } from '../../../../../../shared/services/password-generator.service';
import { RouterLink } from '@angular/router';
import { ICountry } from '../../../../../../core/interfaces/country';
import { BasicDataService } from '../../../../../../core/services/basic-data.service';
import { ICity } from '../../../../../../core/interfaces/city';
import { IPackage } from '../../../../../../core/interfaces/package';

@Component({
  selector: 'app-add-company',
  imports: [
    CustomInputComponent,
    CustomSelectComponent,
    TranslateModule,
    CustomButtonComponent,
    ParagraphComponent,
    KeeniconComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.css',
})
export class AddCompanyComponent implements OnInit, OnDestroy {
  countries: ICountry[] = []
  cities: ICity[] = [];
  packages: IPackage[] = [];

  subscriptions: Subscription = new Subscription();
  form: FormGroup = new FormGroup({});
  apiErrors: { [key: string]: boolean } = {};
  passwordPattern: { valid: boolean; message: string }[] = [];

  constructor(
    public appService: AppService,
    private validationService: ValidationService,
    private fb: FormBuilder,
    private passwordService: PasswordGeneratorService,
    private basicDataService: BasicDataService
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

  ngOnInit() {
    this.getCountries();
    this.getCities();
    this.getPackages();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      companyName: ['', [Validators.required]],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
      package: [null, [Validators.required]],
      businessEmail: ['', [Validators.required, Validators.email]],
      password: [
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
      agree: [false, [Validators.required]],
    });

    const newPasswordControl = this.form.get('password');
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

  getPackages() {
    this.subscriptions.add(
      this.basicDataService.getBasicData('getCompanyPackages').subscribe({
        next: (res) => {
          console.log('Packages:', res.data);
        },
        error: (err) => {
          console.error(err);
        }
      })
    )
  }

  getCities() {
    this.subscriptions.add(
      this.basicDataService.getBasicData('getCities').subscribe({
        next: (res) => {
          console.log('Cities:', res.data);
        },
        error: (err) => {
          console.error(err);
        }
      })
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
      ? this.validationService.getErrorMessage(
        control,
        controlName,
        fieldName,
        this.apiErrors
      )
      : null;
  }

  generatePassword() {
    let password = this.passwordService.generatePassword();
    this.form.controls['password'].patchValue(
      password
    );
  }

  onSubmit() { }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
