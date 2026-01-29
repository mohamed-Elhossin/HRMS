import { Component } from '@angular/core';
import { FileUploadComponent } from "../../../../../../shared/components/file-upload/file-upload.component";
import { CustomInputComponent } from "../../../../../../shared/components/custom-input/custom-input.component";
import { FormsModule } from '@angular/forms';
import { CustomButtonComponent } from "../../../../../../shared/components/custom-button/custom-button.component";

@Component({
  selector: 'app-e-signature',
  imports: [FileUploadComponent, CustomInputComponent, FormsModule, CustomButtonComponent],
  templateUrl: './e-signature.component.html',
  styleUrl: './e-signature.component.css'
})
export class ESignatureComponent {


  previewUrl: string = '';
  badge: string = '';
  otp: string = '';
  badgeLabel: string = '';
  uploading: boolean = false;
  processing: number = 0;

  onFileSelected(_file: any): void {
    this.uploading = true;

    setInterval(() => {
      if (this.processing >= 100) {
        this.uploading = false;
        this.previewUrl = '/img/test.png';
        this.processing = 0;
        this.badge = 'active';
        this.badgeLabel = 'Verified';
        return;
      }
      this.processing += 1;
    }, 100);
  }

  onConfirm() {
  }
  onDelete() {
  }
}
