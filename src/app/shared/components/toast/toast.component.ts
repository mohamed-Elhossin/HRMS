import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../core/services/app.service';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-toast',
  imports: [CommonModule, TranslateModule],
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit {
  toasts: any[] = [];

  constructor(
    private toastService: ToastService,
    public appService: AppService,
  ) { }

  ngOnInit(): void {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  removeToast(id: number) {
    this.toastService.removeToast(id);
  }
}
