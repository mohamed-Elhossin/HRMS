import { Directive, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[onlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective implements OnInit {
  private _allowDecimal = false;
  private _decimalSeparator = '.';
  private _maxDigits?: number;
  private _formatThousands = false;

  regex!: RegExp;

  // Inputs
  @Input()
  set allowDecimal(value: boolean) {
    this._allowDecimal = value;
    this.updateRegex();
  }

  @Input()
  set decimalSeparator(value: string) {
    this._decimalSeparator = value || '.';
    this.updateRegex();
  }

  @Input()
  set maxDigits(value: number) {
    this._maxDigits = value;
  }

  @Input()
  set formatThousands(value: boolean) {
    this._formatThousands = value;
  }

  ngOnInit(): void {
    this.updateRegex();
  }

  private updateRegex(): void {
    this.regex = this._allowDecimal
      ? new RegExp(`^\\d*(\\${this._decimalSeparator}\\d*)?$`)
      : /^\d*$/;
  }

  @HostListener('input', ['$event'])
  onInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // إزالة أي حرف غير مسموح
    value = value
      .replace(new RegExp(`[^0-9\\${this._decimalSeparator}]`, 'g'), '')
      .replace(
        new RegExp(`(\\${this._decimalSeparator}.*?)\\${this._decimalSeparator}.*`, 'g'),
        '$1'
      );

    // تطبيق الحد الأقصى
    if (this._maxDigits && value.replace(/\D/g, '').length > this._maxDigits) {
      const extra = this._allowDecimal && value.includes(this._decimalSeparator) ? 1 : 0;
      value = value.slice(0, this._maxDigits + extra);
    }

    // تنسيق 10,000 إذا مفعل
    if (this._formatThousands) {
      const parts = value.split(this._decimalSeparator);
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      value = parts.join(this._decimalSeparator);
    }

    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(e: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (allowedKeys.includes(e.key)) return;

    const isDigit = /^\d$/.test(e.key);
    const isDecimal = this._allowDecimal && e.key === this._decimalSeparator;

    if (!isDigit && !isDecimal) {
      e.preventDefault();
    }
  }
}
// <input type="text" onlyNumbers [allowDecimal]="true" decimalSeparator="." [maxDigits]="6"/>
