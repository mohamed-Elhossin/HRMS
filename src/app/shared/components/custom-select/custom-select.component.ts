import { NgClass } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { ParagraphComponent } from "../paragraph/paragraph.component";

@Component({
  selector: 'app-custom-select',
  imports: [DropdownModule, TranslateModule, NgClass, FormsModule, ParagraphComponent],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ],
})
export class CustomSelectComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() description: string = '';
  @Input() labelClass: string = 'text-gray-800';
  @Input() labelPosition: 'vertical' | 'horizontal' = 'horizontal';
  @Input() selectClass: string = '';
  @Input({ required: true }) type: 'prime' | 'default' = 'default';
  @Input({ required: true }) optionLabel: any = '';
  @Input({ required: true }) optionValue: any = '';
  @Input() hint: string = '';
  @Input() hintClass: string = '';
  @Input() placeholder: string = 'Select Option';
  @Input() filterBy: string = '';
  @Input() errorMessage: string | string[] | null = null;

  value: any = '';

  @Input({ required: true }) options: any;

  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholderDisabled: boolean = false;
  @Input() showClear: boolean = false;
  @Input() filter: boolean = false;
  @Input() required: boolean = false;

  labelAsId(label: string): string {
    return label.replace(/\s+/g, '-').toLowerCase();
  }

  onChange: (_: any) => void = () => { };
  onTouched: () => void = () => { };
  // ==== ControlValueAccessor Implementation ====

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectChange(event: any): void {
    this.value = event;
    this.onChange(this.value);
    this.onTouched();
  }

}
