import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-status-badge',
  imports: [NgClass,TranslateModule],
  standalone: true,
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css'
})
export class StatusBadgeComponent {
  @Input({ required: true }) status:  'active' | 'not-verified' | 'inactive' | 'pending' | 'default' = 'active';
  @Input({ required: true }) label: string = '';
  @Input() badgeClass: string = '';
  @Input() badgeStyle: string = '';

  get styleClasses(): string {
    switch (this.status) {
      case 'active':
        return 'text-[#04B440] bg-green-100 border-[#17c65333] font-[300] ' + this.badgeClass;
      case 'not-verified':
        return 'text-rose-600 bg-rose-100 border-rose-300 font-[300] ' + this.badgeClass;
      case 'inactive':
        return 'text-gray-600 bg-gray-100 border-gray-300 font-[300] ' + this.badgeClass;
      case 'pending':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300 font-[300] ' + this.badgeClass;
      case 'default':
        return 'text-gray-600 bg-[#F1F1F4] border-0 py-2 px-3 font-[300] ' + this.badgeClass;
    }
  }


}
