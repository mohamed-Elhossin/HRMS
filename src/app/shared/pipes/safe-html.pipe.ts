import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';

@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | null): SafeHtml {
    const clean = DOMPurify.sanitize(value || '', {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'br', 'span'],
      ALLOWED_ATTR: ['href', 'target', 'style']
    });

    return this.sanitizer.bypassSecurityTrustHtml(clean);
  }
}

// <div [innerHTML]="htmlContent | safeHtml"></div>

