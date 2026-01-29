import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  Provider,
  TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface PageChangedEvent {
  itemsPerPage: number;
  page: number;
}

export const PAGINATION_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaginationComponent),
  multi: true,
};

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  providers: [PAGINATION_CONTROL_VALUE_ACCESSOR],
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() totalItemsCount!: number;
  @Input() per_page!: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() perPageChange: EventEmitter<number> = new EventEmitter<number>();

  perPageOptions: number[] = [10, 20, 50, 100];

  navigateTo(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
      this.scrollToTop();
    }
  }

  ngOnInit(): void {
    this.calculateTotalPages();
  }

  scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  calculateTotalPages(): void {
    if (this.per_page > 0) {
      this.totalPages = Math.ceil(this.totalItemsCount / this.per_page);
    } else {
      this.totalPages = 0;
    }
  }
  calculatePages(): number[] {
    const pages: number[] = [];
    const total = this.totalPages || 1;
    const current = this.currentPage || 1;

    const maxPagesToShow = 5; // Maximum number of pages to show

    // Case when total pages are less than or equal to the max number of pages to show
    if (total <= maxPagesToShow) {
      for (let i = 1; i <= total; i++) {
        pages.push(i); // Show all pages when the total number of pages is small (<= 5)
      }
    } else {
      // Always show the first page
      pages.push(1);

      // If the current page is close to the beginning, show the first few pages
      if (current <= 3) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
      }
      // If the current page is close to the end, show the last few pages
      else if (current >= total - 2) {
        for (let i = total - 3; i < total; i++) {
          pages.push(i);
        }
      }
      // Otherwise, show pages around the current page
      else {
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
      }

      // Always show the last page, unless it's already in the range
      if (total > pages[pages.length - 1]) {
        pages.push(total);
      }
    }

    return pages;
  }

  onPerPageChange(perPage: number): void {
    this.per_page = perPage;
    this.perPageChange.emit(this.per_page);
    this.navigateTo(1);
  }
}
