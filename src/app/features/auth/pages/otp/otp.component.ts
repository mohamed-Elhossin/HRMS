import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { CustomInputComponent } from '../../../../shared/components/custom-input/custom-input.component';
import { ParagraphComponent } from "../../../../shared/components/paragraph/paragraph.component";
import { environment } from '../../../../../environments/environment';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-otp',
  imports: [CardComponent, CustomInputComponent, CustomButtonComponent, ReactiveFormsModule, ParagraphComponent, NgxCaptchaModule, RouterLink, TranslateModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent  implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  form: FormGroup = new FormGroup({})
  siteKey: string = environment.recapchaSiteKey;
  timer: any;
  timerFinished: boolean = false;
  timeLeft: number = 5;


  constructor(
    private fb: FormBuilder,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.startTimer();
  }

  createForm() {
    this.form = this.fb.group({
      OTP: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      recaptcha: ['', Validators.required]
    });
  }

  startTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.timerFinished = true;
      }
    }, 1000);
  }

  handleSuccess(token: string) {
    this.form.get('recaptcha')?.setValue(token);
  }

  get timeLeftFormatted(): string {
    const minutes: number = Math.floor(this.timeLeft / 60);
    const seconds: number = this.timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  resendOtp(){
    this.timeLeft = 60;
    this.timerFinished = false;
    this.startTimer()
  }

  onSubmit() {
    this.router.navigateByUrl('/dashboard')
    this.subscriptions.add(

    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
