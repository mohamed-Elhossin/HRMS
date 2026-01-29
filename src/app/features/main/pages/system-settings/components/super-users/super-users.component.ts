import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableComponent } from '../../../../../../shared/components/table/table.component';
import { StatusBadgeComponent } from '../../../../../../shared/components/status-badge/status-badge.component';
import { RouterModule } from '@angular/router';
import { CustomButtonComponent } from '../../../../../../shared/components/custom-button/custom-button.component';
import { ParagraphComponent } from "../../../../../../shared/components/paragraph/paragraph.component";
import { TranslateModule } from '@ngx-translate/core';
import { TitleCasePipe } from '@angular/common';
import { KeeniconComponent } from "../../../../../../shared/components/keenicon/keenicon.component";
import { OffcanvasComponent } from "../../../../../../shared/components/offcanvas/offcanvas.component";
import { AddNewSuperUserComponent } from "../add-new-super-user/add-new-super-user.component";

@Component({
  selector: 'app-super-users',
  imports: [TableComponent, StatusBadgeComponent, TitleCasePipe, CustomButtonComponent, RouterModule, TranslateModule, ParagraphComponent, KeeniconComponent, OffcanvasComponent, AddNewSuperUserComponent],
  templateUrl: './super-users.component.html',
  styleUrl: './super-users.component.css'
})
export class SuperUsersComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  loading: boolean = true;
  customTemplates: { [key: string]: TemplateRef<any> } = {};
  columns: any = []
  data: any[] = []
  showOffcanvas: boolean = false;

  @ViewChild('companyNameTemplate', { static: true }) companyNameTemplate!: TemplateRef<any>;
  @ViewChild('emailTemplate', { static: true }) emailTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate', { static: true }) statusTemplate!: TemplateRef<any>;
  @ViewChild('multiLoginTemplate', { static: true }) multiLoginTemplate!: TemplateRef<any>;
  @ViewChild('countryTemplate', { static: true }) countryTemplate!: TemplateRef<any>;
  @ViewChild('actionTemplate', { static: true }) actionTemplate!: TemplateRef<any>;
  @ViewChild('offcanvas') offcanvas!: OffcanvasComponent;

  ngOnInit(): void {
    this.columns = [
      { key: 'name', label: 'Name', type: 'text', templateKey: 'companyName', custom: true },
      { key: 'email', label: 'Business Email', type: 'text', templateKey: 'email', custom: true },
      { key: 'mobile', label: 'Mobile', type: 'text' },
      { key: 'status', label: 'Account Status', type: 'date', templateKey: 'status', custom: true },
      { key: 'multiLogin', label: 'Multi Login', type: 'date', templateKey: 'multiLogin', custom: true },
      { key: 'country', label: 'Country', type: 'date', templateKey: 'country', custom: true },
      { key: 'action', label: 'Action', type: 'date', templateKey: 'action', custom: true },
    ];

    setTimeout(() => {
      this.data = [
        {
          id: '1',
          name: 'Ramy Salem',
          code: 'ID# 1',
          email: 'it@swalac.com',
          emailStatus: 'verified',
          mobile: '+966 5603738509',
          accountStatus: 'active',
          multiLogin: 'active',
          country: 'Saudi Arabia',
          city: 'Jeddah',
        }
      ];
      this.loading = false;
    }, 1000);

  }

  ngAfterViewInit(): void {
    this.customTemplates['companyName'] = this.companyNameTemplate;
    this.customTemplates['email'] = this.emailTemplate;
    this.customTemplates['status'] = this.statusTemplate;
    this.customTemplates['multiLogin'] = this.multiLoginTemplate;
    this.customTemplates['country'] = this.countryTemplate;
    this.customTemplates['action'] = this.actionTemplate;
  }

  onSearch(_event: any) {
  }

  onStatusChange(_event: any) {
  }

  openOffcanvas() {
    this.showOffcanvas = true;
    setTimeout(() => {
      if (this.offcanvas) {
        this.offcanvas.open();
      }
    });
  }

  closeOffcanvas() {
    this.showOffcanvas = false;
    // Optionally, you can call this.offcanvasComponent.close(); if needed
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
