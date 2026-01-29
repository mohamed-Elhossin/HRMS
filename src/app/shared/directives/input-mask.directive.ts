import { Directive, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[inputMask]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskDirective),
      multi: true
    }
  ]
})
export class InputMaskDirective implements ControlValueAccessor {
  @Input('inputMask') maskPattern = '';

  private onChange = (_value: any) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef<HTMLInputElement>) {}

  // Apply mask formatting to the raw number
  private format(value: string): string {
    const raw = value.replace(/\D/g, '');
    let result = '';
    let rawIndex = 0;

    for (const char of this.maskPattern) {
      if (char === '#') {
        if (raw[rawIndex]) result += raw[rawIndex++];
        else break;
      } else {
        result += char;
      }
    }

    return result;
  }

  // Handle user input
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value.replace(/\D/g, '');
    const formatted = this.format(rawValue);

    input.value = formatted;
    this.onChange(rawValue); // Send unformatted value
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    const formatted = this.format(value || '');
    this.el.nativeElement.value = formatted;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }
}

// <input type="text" [inputMask]="'#### #### #### ####'" formControlName="cardNumber" />

