import { Inject, Injectable, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icons } from '../icons/icon';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  keyOfLang: string = 'lang-approval-system'
  private renderer!: Renderer2;

  constructor(
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  setRenderer(renderer: Renderer2) {
    this.renderer = renderer;
  }

  getIcons(name: keyof typeof icons, style?: string): SafeHtml {
    let iconHtml = icons[name];
    if (style) {
      iconHtml = iconHtml.replace('<i', `<i style="${style}"`);
    }
    return this.sanitizer.bypassSecurityTrustHtml(iconHtml);
  }

  getLanguage() {
    const lang = localStorage.getItem(this.keyOfLang) || 'en';
    return String(lang)?.toLowerCase()
  }

  changeDirection(direction: string) {
    this.document.documentElement.lang = direction === 'rtl' ? 'ar' : 'en';
    this.document.documentElement.dir = direction;
  }

  getDirection() {
    const lang = this.getLanguage()
    return String(lang)?.toLowerCase() === 'ar' ? 'rtl' : 'ltr'
  }

  changeLanguage(): void {
    const lang = this.getLanguage() === 'en' ? 'ar' : 'en';
    const direction = lang === 'en' ? 'ltr' : 'rtl';

    this.changeDirection(direction);
    this.translate.use(lang);

    if (this.renderer) {
      this.renderer.setAttribute(this.document.documentElement, 'lang', lang);
      this.renderer.setAttribute(this.document.documentElement, 'dir', direction);
    }
    localStorage.setItem(this.keyOfLang, lang);
  }
}
