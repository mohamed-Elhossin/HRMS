import { Directive, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowPassword]',
  standalone: true,
})
export class ShowPasswordDirective {
  @Input('appShowPassword') targetInput!: HTMLInputElement; // تحديد الحقل المستهدف

  constructor(private renderer: Renderer2) {}

  @HostListener('click')
  togglePassword(): void {
    if (this.targetInput) {
      const inputType = this.targetInput.type === 'password' ? 'text' : 'password';
      this.renderer.setAttribute(this.targetInput, 'type', inputType);
    }
  }
}
