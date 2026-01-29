import { NgClass } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-paragraph',
  imports: [NgClass],
  templateUrl: './paragraph.component.html',
  styleUrl: './paragraph.component.css'
})
export class ParagraphComponent implements AfterViewChecked {


  @Input() paragraphClass: string = '';
  @ViewChild('paragraph') paragraphElement!: ElementRef;

  ngAfterViewChecked(): void {
    if (this.paragraphElement) {
      this.paragraphElement.nativeElement.className = this.paragraphClass;
    }
  }

}
