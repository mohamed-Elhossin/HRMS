import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFieldValidation]',
  standalone: true, // يتيح استخدام التوجيه في مكونات Standalone
})
export class FieldValidationDirective {
  constructor(private el: ElementRef, private renderer: Renderer2, private control: NgControl) {}

  @HostListener('focus') onFocus() {
 
    this.renderer.addClass(this.el.nativeElement, 'focused-input');
    this.renderer.removeClass(this.el.nativeElement, 'invalid-input');
    this.renderer.removeClass(this.el.nativeElement, 'valid-input');
  }

  @HostListener('blur') onBlur() {
    const control = this.control?.control;

    if (control) {
      if (control.valid && control.touched) {
        this.applyClass('valid-input', 'invalid-input');
      } else if (control.invalid && control.touched) {
        this.applyClass('invalid-input', 'valid-input');
      }
    }

    this.renderer.removeClass(this.el.nativeElement, 'focused-input');
  }

  private applyClass(addClass: string, removeClass: string) {
    this.renderer.addClass(this.el.nativeElement, addClass);
    this.renderer.removeClass(this.el.nativeElement, removeClass);
  }
}
