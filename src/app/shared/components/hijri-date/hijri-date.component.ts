import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment-hijri';

@Component({
  selector: 'app-hijri-date',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './hijri-date.component.html',
  styleUrl: './hijri-date.component.css'
})
export class HijriDateComponent {
  @ViewChild('pickerContainer') pickerRef!: ElementRef;

  showPicker = false;
  gregorianOutput = '';

  selectedYear = '1445';
  selectedMonth = '09';
  selectedDay = '01';

  gregorianYear = '';
  gregorianMonth = '';
  gregorianDay = '';


  years = Array.from({ length: 200 }, (_, i) => (1300 + i).toString());
  months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  days = Array.from({ length: 30 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  gregorianYears = Array.from({ length: 200 }, (_, i) => (1900 + i).toString());

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.pickerRef?.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showPicker = false;
    }
  }

  convertToGregorian() {
    const hijriDate = `${this.selectedYear}-${this.selectedMonth}-${this.selectedDay}`;
    const m = moment(hijriDate, 'iYYYY-iMM-iDD');
    this.gregorianOutput = m.format('YYYY-MM-DD');

    const [year, month, day] = this.gregorianOutput.split('-');
    this.gregorianYear = year;
    this.gregorianMonth = month;
    this.gregorianDay = day;
  }


  convertToHijri() {
    const gregorianDate = `${this.gregorianYear}-${this.gregorianMonth}-${this.gregorianDay}`;
    const m = moment(gregorianDate, 'YYYY-MM-DD').format('iYYYY-iMM-iDD');
    const [hYear, hMonth, hDay] = m.split('-');

    this.selectedYear = hYear;
    this.selectedMonth = hMonth;
    this.selectedDay = hDay;
  }


  openPicker(event: MouseEvent) {
    event.stopPropagation();
    this.showPicker = true;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.gregorianOutput).then(() => {
    });
  }

}
