import { AfterViewChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-chip',
  imports: [ TranslateModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css'
})
export class ChipComponent implements AfterViewChecked {

  @Input({ required: true }) label: any = '';
  @Input() chipClass: string = '';

  constructor(
  ) { }

  @ViewChild('chip') chipElement!: ElementRef;

  ngAfterViewChecked(): void {
    if (this.chipElement) {
      this.chipElement.nativeElement.className = `text-center py-2 px-4 rounded-md bg-[#F1F1F4] text-[#4B5675] ${this.chipClass}`;
    }
  }
}
