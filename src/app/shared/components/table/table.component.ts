// table.component.ts
import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../core/services/app.service';
import { LoaderComponent } from '../loader/loader.component';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent, TranslateModule, CardComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        // Optional: stagger animation for each item
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger('100ms', [
            animate('100ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class TableComponent implements OnInit, OnChanges {
  @ContentChild('customCell', { static: false }) customCellTemplate!: TemplateRef<any>;
  @Input() templates: { [key: string]: TemplateRef<any> } = {};

  @Input({ required: true }) columns: {
    key: string;
    label: string;
    type?: 'text' | 'number' | 'date' | 'range' | 'select';
    width?: string;
    options?: string[];
    custom: boolean;
    templateKey?: string;
  }[] = [];

  @Input({ required: true }) data: any[] = [];
  @Input({ required: true }) loading: boolean = true

  filteredData: any[] = [];
  filters: { [key: string]: any } = {};
  showFilterInput: { [key: string]: boolean } = {};

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  @ViewChild('filterInput') filterInput!: ElementRef;

  constructor(public appService: AppService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.filteredData = [...this.data];
      this.columns?.forEach((col) => {
        this.filters[col.key] = '';
        this.showFilterInput[col.key] = false;
      });
    }
    if (changes['loading']) {
      this.loading = changes['loading'].currentValue;
    }

  }

  ngOnInit() {

  }

  toggleFilterInput(column: string) {
    this.showFilterInput[column] = !this.showFilterInput[column];

    if (this.showFilterInput[column]) {
      setTimeout(() => {
        this.filterInput?.nativeElement?.focus();
      });
    }
  }

  applyFilters() {
    this.filteredData = this.data?.filter((item) =>
      this.columns.every((col) => {
        const filter = this.filters[col.key];
        if (!filter) return true;

        const value = this.getNestedValue(item, col.key);
        if (col.type === 'range') {
          return value >= filter;
        }

        return value?.toString()?.toLowerCase()?.includes(filter?.toString()?.toLowerCase());
      })
    );
    this.applySorting();
  }

  clearFilter(column: string) {
    this.filters[column] = '';
    this.applyFilters();
  }

  applySorting() {
    if (this.sortColumn) {
      this.filteredData.sort((a, b) => {
        const valA = a[this.sortColumn];
        const valB = b[this.sortColumn];
        const comparison = valA < valB ? -1 : valA > valB ? 1 : 0;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }
  }

  setSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applySorting();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const insideDropdown = clickedElement.closest('.filter-dropdown');
    const isFilterButton = clickedElement.closest('button[title="Toggle filter"]');

    if (!insideDropdown && !isFilterButton) {
      Object.keys(this.showFilterInput)?.forEach((key) => {
        this.showFilterInput[key] = false;
      });
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(_event: Event) {
    Object.keys(this.showFilterInput)?.forEach((key) => {
      this.showFilterInput[key] = false;
    });
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

}
