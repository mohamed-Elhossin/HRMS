import { Component,  OnInit } from '@angular/core';
import { KeeniconComponent } from "../keenicon/keenicon.component";
import { TranslateModule } from '@ngx-translate/core';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-custom-alert',
  imports: [KeeniconComponent, TranslateModule],
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.css'
})
export class CustomAlertComponent implements OnInit {
  errors: any[] = [];

  // @Input({ required: true }) icon: 'success' | 'error' = 'success';
  // @Input({ required: true }) bgColor: 'white' | 'red' | 'green' = 'green';
  // @Input({ required: true }) title: string = '';
  // @Input({ required: true }) message: string = '';
  // @Input({ required: true }) textColor: 'white' | 'red' | 'black' = 'white';

  constructor(
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.errorService.toasts$.subscribe(errors => {
      this.errors = errors;
    });
  }

  styleIcon(icon: 'success' | 'error'): { style: string, icon: string } {
    switch (icon) {
      case 'success':
        return { style: 'font-size: 30px;color: white', icon: 'check' };
      case 'error':
        return { style: 'font-size: 30px;color: white', icon: 'abstract-11' };
      default:
        return { style: 'font-size: 30px;color: white', icon: 'abstract-11' };
    }
  }

  getTextColor(textColor: string): string {
    switch (textColor) {
      case 'white':
        return 'text-white ';
      case 'red':
        return 'text-[#F00] ';
      case 'black':
        return 'text-black ';
      default:
        return 'text-white ';
    }
  }

  getBgColor(bgColor: string): string {
    switch (bgColor) {
      case 'white':
        return 'background-color: white; ';
      case 'red':
        return 'background-color: #F00; ';
      case 'green':
        return 'background-color: #196828; ';
      default:
        return 'background-color: black; ';
    }
  }

  removeError(id: number) {
    this.errorService.removeToast(id);
  }
}
