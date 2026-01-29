import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitlePageComponent } from "../../../../shared/components/title-page/title-page.component";
import { ActivatedRoute, RouterModule, } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-companies',
  imports: [TitlePageComponent, RouterModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  tabs: any[] = [];
  currentId: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    this.currentId = this.getIdFromUrl();
    this.subscription.add(
      this.activatedRoute.paramMap.subscribe(param =>{
        this.currentId = param.get('id');
      })
    );
    if (this.currentId) {
      this.updateTabs();
    }
  }

  getIdFromUrl(): string | null {
    const url = window.location.href;
    const id = url.split('/').pop();
    // Check if the last segment is a valid ID (e.g., a number or alphanumeric string)
    if (!id || isNaN(Number(id))) {
      return null;
    }
    return id || null;
  }

  updateTabs(): void {
    this.tabs = [
      { label: 'Company Information', url: `/companies/company-information/${this.currentId}` },
      { label: 'Package  Details', url: `/companies/package-details/${this.currentId}` },
      { label: 'Billing and Invoices', url: `/companies/billing-and-invoices/${this.currentId}` },
      { label: 'Themes and Styles', url: `/companies/themes-and-styles/${this.currentId}` },
    ];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
