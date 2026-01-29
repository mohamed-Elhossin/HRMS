import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppService } from '../../../core/services/app.service';
import { NgClass } from '@angular/common';
import { CustomButtonComponent } from "../custom-button/custom-button.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog',
  imports: [NgClass, CustomButtonComponent, TranslateModule],
  templateUrl: './dialog.component.html',
  standalone: true,
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input() show = false;
  @Input() title = '';
  @Input() icon: any = 'pen';
  @Input() modalClass: any = '';
  @Input() backgroundClass: any = '';
  @Input() isFooter: boolean = false;
  @Input() isHeader: boolean = false;
  @Input() isTitle: boolean = false;
  @Input() isDisabled: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  constructor(
    public appService: AppService
  ) {

  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.submit.emit();
    this.close.emit();
  }
}
