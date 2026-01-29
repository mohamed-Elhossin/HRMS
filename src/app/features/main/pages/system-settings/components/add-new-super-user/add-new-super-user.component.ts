import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CustomInputComponent } from '../../../../../../shared/components/custom-input/custom-input.component';
import { CustomSelectComponent } from '../../../../../../shared/components/custom-select/custom-select.component';
import { ValidationService } from '../../../../../../core/services/validation.service';
import { CustomButtonComponent } from "../../../../../../shared/components/custom-button/custom-button.component";
import { ICountry } from '../../../../../../core/interfaces/country';
import { ICity } from '../../../../../../core/interfaces/city';
import { BasicDataService } from '../../../../../../core/services/basic-data.service';

@Component({
  selector: 'app-add-new-super-user',
  imports: [TranslateModule, ReactiveFormsModule, CustomInputComponent, CustomSelectComponent, CustomButtonComponent],
  templateUrl: './add-new-super-user.component.html',
  styleUrl: './add-new-super-user.component.css'
})
export class AddNewSuperUserComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  form: FormGroup = new FormGroup({});
  apiErrors: { [key: string]: boolean } = {};

  countries: ICountry[] = [];
  cities: ICity[] = [];

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private basicDataService: BasicDataService
  ) {

  }

  onSubmit() {

  }

  ngOnInit() {
    this.getCities();
    this.getCountries();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      multiLogin: [''],
    });
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
