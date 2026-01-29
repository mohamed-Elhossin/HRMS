import { Component, Input } from '@angular/core';
import { ShowPasswordDirective } from '../../directives/show-password.directive';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-show-password',
  standalone: true,
  imports: [ShowPasswordDirective],
  templateUrl: './show-password.component.html',
  styleUrl: './show-password.component.css',
})
export class ShowPasswordComponent {
  @Input() targetInput!: HTMLInputElement;
  @Input() inputClass!: string;
  constructor(public translate: TranslateService){}
}
