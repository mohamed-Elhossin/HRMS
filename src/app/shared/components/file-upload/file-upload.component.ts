import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppService } from '../../../core/services/app.service';
import { maxImageSize } from '../../../core/constants/general';
import { CustomButtonComponent } from "../custom-button/custom-button.component";
import { TranslateModule } from '@ngx-translate/core';
import { StatusBadgeComponent } from "../status-badge/status-badge.component";

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent, TranslateModule, StatusBadgeComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  constructor(public appService: AppService) { }

  // files: File[] = [];
  file: File | null = null;

  @Output() fileSelected = new EventEmitter<File>(); // Emit list of files
  @Input() required = false;
  @Input() uploading = false;
  @Input() badge = '';
  @Input() badgeLabel = '';
  @Input() processing: number = 0;
  @Input() previewUrl = '';
  @Input() accept = 'image/*';

  apiErrors: { [key: string]: boolean } = {
    invalidType: false,
    tooLarge: false,
    processingFailed: false,
  };
  isDragging = false;

  handleDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  handleDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.setFile(file);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.setFile(input.files[0]);
    }
  }

  // Process and validate file
  private setFile(file: File) {
    this.apiErrors = {
      invalidType: false,
      tooLarge: false,
      processingFailed: false,
    };

    if (!file.type.startsWith('image/')) {
      this.apiErrors['invalidType'] = true;
      return;
    }

    if (file.size > maxImageSize) {
      this.apiErrors['tooLarge'] = true;
      return;
    }

    this.fileSelected.emit(file);
  }

  removeFile() {
    this.file = null;
    this.apiErrors = {
      invalidType: false,
      tooLarge: false,
      processingFailed: false,
    };
    this.fileSelected.emit(null as any);
  }

  cancelUpload() {
    this.uploading = false;
    this.file = null;
    this.apiErrors = {
      invalidType: false,
      tooLarge: false,
      processingFailed: false,
    };
    this.fileSelected.emit(null as any);
  }

  getSafeStatus(status: string): 'active' | 'not-verified' | 'inactive' | 'pending' | 'default' {
    const validStatuses: ('active' | 'not-verified' | 'inactive' | 'pending' | 'default')[] = ['active', 'not-verified', 'inactive', 'pending', 'default'];
    return validStatuses.includes(status as any) ? status as any : 'default';
  }
}
