import { Component,  HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../../core/services/app.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { DropdownService } from '../../services/dropdown.service';

@Component({
  selector: 'app-dropdown',
  imports: [TranslateModule, NgClass, RouterLink],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit, OnDestroy {
  constructor(
    public appService: AppService,
    private dropdownService: DropdownService
  ) {}

  @Input({ required: true }) togglerId: any;
  @Input() togglerIcon: any = '';
  @Input() togglerIconStyle: any = '';
  @Input() togglerIconPosition: 'start' | 'end' = 'start';
  @Input() togglerTitle: string = '';
  @Input() items: {
    title?: string;
    itemClass?: string;
    icon?: any;
    iconStyle?: string;
    iconPosition?: string;
    link: string;
  }[] = [];

  open = false;
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.dropdownService.dropdownToggles$.subscribe((id) => {
      this.open = this.togglerId === id;
    })
    );
  }

  toggleDropdown() {
    this.dropdownService.toggle(this.open ? null : this.togglerId);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (!target.closest('.dropdown-container')) {
      this.dropdownService.closeAll();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
