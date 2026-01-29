import { Component, Input } from '@angular/core';
import { AppService } from '../../../core/services/app.service';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { KeeniconComponent } from "../keenicon/keenicon.component";

@Component({
  selector: 'app-custom-button',
  imports: [NgClass, TranslateModule, KeeniconComponent],
  standalone: true,
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css'
})
export class CustomButtonComponent {
  @Input({ required: true }) type: 'button' | 'submit' | 'reset' = 'button';
  @Input() label: string = '';
  @Input() variant: 'primary' | 'secondary' | 'blue' | 'outline' | 'ghost' | 'danger' | 'black' | 'white' = 'primary';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() icon: any = '';
  @Input() iconPosition: 'start' | 'end' = 'start';
  @Input() iconStyle: string = '';
  @Input() background: string = '';
  @Input() color: string = '';
  @Input() buttonClass: string = '';
  @Input() labelClass: string = '';
  @Input() loadingText: string = 'Loading...';


  constructor(public appService: AppService) { }

  computeClasses(): string[] {
    const base = [];

    if (this.disabled) {
      base.push('opacity-60', 'cursor-not-allowed');
    }

    if (this.background || this.color) {
      base.push('border', 'border-transparent');
      return [
        ...base,
        this.background ? '' : 'bg-gray-500',
        this.color ? '' : 'text-white'
      ];
    }

    switch (this.variant) {
      case 'primary':
        base.push('bg-[#414E5D]', 'text-white');
        break;
      case 'secondary':
        base.push('bg-[#F1F1F4]', 'text-[#4B5675]');
        break;
      case 'blue':
        base.push('bg-[#1B84FF]', 'text-white');
        break;
      case 'outline':
        base.push('bg-white', 'border-2', 'border-[#dbdfe96b]', 'text-[#2F3A4A]', 'border-w');
        break;
      case 'ghost':
        base.push('bg-transparent', 'text-[#2F3A4A]');
        break;
      case 'danger':
        base.push('bg-[#D92D20]', 'text-white');
        break;
      case 'black':
        base.push('bg-black', 'text-white');
        break;
      case 'white':
        base.push('bg-white', 'text-black');
        break;

    }

    base.push(this.buttonClass);

    return base;
  }
}
