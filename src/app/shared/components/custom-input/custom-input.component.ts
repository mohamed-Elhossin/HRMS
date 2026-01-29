import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { AppService } from '../../../core/services/app.service';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StatusBadgeComponent } from "../status-badge/status-badge.component";
import { ParagraphComponent } from "../paragraph/paragraph.component";

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule, StatusBadgeComponent, ParagraphComponent],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {

  constructor(
    public appService: AppService,
    public eRef: ElementRef
  ) {

  }

  dropdownOpen = false;
  defuletClass = 'mt-1 block w-full border border-gray-300 rounded-sm p-2 focus-visible:outline-double'

  @ViewChild('dropdownButton', { static: false }) dropdownButton!: ElementRef;
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu!: ElementRef;
  @ViewChild('inputElement') inputElementRef!: ElementRef<HTMLInputElement>;
  @ViewChild('labelTage') labelElement!: ElementRef;

  @Output() fileChange = new EventEmitter<Event>();

  @ContentChild('input', { static: false }) projectedInput?: ElementRef;

  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() description: string = '';
  @Input() badge: 'active' | 'not-verified' | 'inactive' | 'pending' | 'default' | null = null;
  @Input() badgeLabel: string = '';
  @Input() badgeClass: string = '';
  @Input() labelClass: string = 'text-gray-800';
  @Input() inputClass: string = '';
  @Input() hint: string = '';
  @Input() hintClass: string = '';
  @Input() labelPosition: 'vertical' | 'horizontal' = 'horizontal';

  @Input() iconStyle: any = 'opacity:0.5;color: #fff;';
  @Input() icon: any = '';
  @Input() iconPosition: 'start' | 'end' = 'start';

  @Input() countryCode: string = '966';

  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() textarea: boolean = false;
  @Input() multiple: boolean = false;
  @Input() numberOnly: boolean = false;

  @Input() min: number = 0;
  @Input() errorMessage: string | string[] | null = null;
  @Input() extraAttrs: { [key: string]: any } = {};

  value: any = this.multiple ? [] : '';

  onFileSelected(event: Event): void {
    this.fileChange.emit(event);
  }

  // Functions for ControlValueAccessor
  onChange: (_: any) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: any): void {
    this.value = this.multiple ? (Array.isArray(value) ? value : []) : value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event | string): void {
    if (typeof event === 'string') {
      this.value = this.multiple ? [event] : event;
    } else {
      const input = event.target as HTMLInputElement;
      this.value = input.type === 'checkbox' ? input.checked : input.value;
    }
    this.onChange(this.value);
  }

  onDocumentClick = (event: MouseEvent) => {
    if (!this.dropdownOpen) return;

    const target = event.target as HTMLElement;
    const clickedInside = this.eRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.dropdownOpen = false;
    }
  };

  onKeyDown = (event: KeyboardEvent) => {
    if (this.dropdownOpen && event.key === 'Escape') {
      this.dropdownOpen = false;
    }
  };

  ngAfterViewInit(): void {
    document.addEventListener('click', this.onDocumentClick, true);
    document.addEventListener('keydown', this.onKeyDown, true);
  }
  get hasProjectedInput() {
    return !!this.projectedInput;
  }
  ngOnChanges() {
    this.actualInputType = this.type;
  }

  onKeyPressNumeric(event: KeyboardEvent): void {
    if (this.numberOnly === true && (event.key < '0' || event.key > '9')) {
      event.preventDefault();
    }
  }
  actualInputType: string = this.type;

  togglePasswordVisibility(icon: any) {

    if (this.type !== 'password') return;
    // Toggle the input type between 'password' and 'text'
    this.actualInputType = this.actualInputType === 'password' ? 'text' : 'password';
    // change icon from eye to eyeSlash or vice versa
    if (icon === 'eye') {
      this.icon = 'eyeSlash';
    } else {
      this.icon = 'eye';
    }
  }

  labelAsId(label: string): string {
    return label.replace(/\s+/g, '-').toLowerCase();
  }


  ngOnDestroy(): void {
    document.removeEventListener('click', this.onDocumentClick, true);
    document.removeEventListener('keydown', this.onKeyDown, true);
  }

}
