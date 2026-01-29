import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCount = 0;

  constructor(private spinnerService:NgxSpinnerService) { }
  busy(){

    this.busyRequestCount++;
    this.spinnerService;
    this.spinnerService.show()
  }

  idle(){
    this.busyRequestCount--;
      this.spinnerService.hide();
  }
}
