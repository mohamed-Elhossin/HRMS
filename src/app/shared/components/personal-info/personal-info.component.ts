import { Component, Input } from '@angular/core';
import { AppService } from '../../../core/services/app.service';
import { NgClass } from '@angular/common';
import { StatusBadgeComponent } from "../status-badge/status-badge.component";
import { KeeniconComponent } from "../keenicon/keenicon.component";

@Component({
  selector: 'app-personal-info',
  imports: [NgClass, StatusBadgeComponent, KeeniconComponent],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent {

  constructor(public appService:AppService){}

  @Input() personalInfoClass: string = '';

  @Input() iconStyle: any = '';
  @Input() icon: any = '';
  @Input() iconClass: any = '';
  @Input() iconPosition: 'start' | 'end' = 'start';

  @Input() badge: boolean = false;
  @Input() badgeStatus: 'active' | 'not-verified' | 'inactive' | 'pending' | 'default' = 'active';
  @Input() badgeLabel: string = '';
  @Input() badgeClass: string = 'bg-transparent border-0 font-semibold px-1 ms-1';
  @Input() badgeStyle: string = '';

}
