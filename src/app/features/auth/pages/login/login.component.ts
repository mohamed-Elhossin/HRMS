import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { CustomInputComponent } from "../../../../shared/components/custom-input/custom-input.component";
import { CustomButtonComponent } from "../../../../shared/components/custom-button/custom-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { CustomAlertComponent } from "../../../../shared/components/custom-alert/custom-alert.component";
import { ErrorService } from '../../../../shared/services/error.service';

@Component({
  selector: 'app-login',
  imports: [CardComponent, CustomInputComponent, CustomButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  form: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private errorService: ErrorService
  ) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    this.subscriptions.add(

    )

    this.errorService.showToast(
      'Credentials are incorrect',
      'error',
      500000,
      'Email or password is incorrect',
      'red',
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
