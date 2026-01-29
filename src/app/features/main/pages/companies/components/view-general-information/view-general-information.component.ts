import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomInputComponent } from "../../../../../../shared/components/custom-input/custom-input.component";
import { CustomSelectComponent } from "../../../../../../shared/components/custom-select/custom-select.component";
import { TranslateModule } from '@ngx-translate/core';
import { AppService } from '../../../../../../core/services/app.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidationService } from '../../../../../../core/services/validation.service';
import { CustomButtonComponent } from "../../../../../../shared/components/custom-button/custom-button.component";
import { ProfileImageUploadComponent } from "../../../../../../shared/components/profile-image-upload/profile-image-upload.component";
import { BasicDataService } from '../../../../../../core/services/basic-data.service';
import { IPackage } from '../../../../../../core/interfaces/package';
import { ICountry } from '../../../../../../core/interfaces/country';
import { ICity } from '../../../../../../core/interfaces/city';

@Component({
  selector: 'app-view-general-information',
  imports: [CustomInputComponent, CustomSelectComponent, TranslateModule, CustomButtonComponent, ReactiveFormsModule, ProfileImageUploadComponent],
  templateUrl: './view-general-information.component.html',
  styleUrl: './view-general-information.component.css'
})
export class ViewGeneralInformationComponent implements OnInit, OnDestroy {
  countries: ICountry[] = [];
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

  createForm() {
    this.form = this.fb.group({
      companyName: ['', [Validators.required]],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
      package: [2, [Validators.required]],
      businessEmail: ['it@gg.com', [Validators.required, Validators.email]],
      profileImage: [null, [Validators.required]]
    });
    this.form.controls['package'].disable();
    this.form.controls['businessEmail'].disable();
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


  onSubmit() {
    console.log(this.form.value)
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
