import { Component, forwardRef, Input } from '@angular/core';
import { AppService } from '../../../core/services/app.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ParagraphComponent } from "../paragraph/paragraph.component";
// import { KeeniconComponent } from "../keenicon/keenicon.component";

@Component({
  selector: 'app-profile-image-upload',
  imports: [TranslateModule, ParagraphComponent],
  templateUrl: './profile-image-upload.component.html',
  styleUrl: './profile-image-upload.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileImageUploadComponent),
      multi: true,
    },
  ],
})
export class ProfileImageUploadComponent implements ControlValueAccessor {
  validationMessage:any;
  @Input() accept: any;
  previewUrl: string | ArrayBuffer | null = null;
  file: any;
  constructor(public appService: AppService) {}
  @Input() disabled: boolean = false;

  triggerFileInput() {
    const input = document.getElementById('fileInput') as HTMLInputElement;
    input?.click();
  }

  onFileSelected(event: Event) {
    this.file = (event.target as HTMLInputElement)?.files?.[0];
    this.validationMessage = null;
    this.onChange(this.file);
    this.onTouched();
    if (this.file && this.isValidImage(this.file)) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
          const validWidth = image.width;
          const validheight = image.height;
          console.log(validWidth, validheight)
          if (Number(validWidth) > 300 || Number(validheight) > 300) {
            this.validationMessage = {
              size: 'image up to 300px x 300px allowed.'
            }
          } else {
            this.previewUrl = reader.result;
          }
        };
      };
      reader.readAsDataURL(this.file);
    } else {
      this.validationMessage = {
        type: "Invalid file. Only JPEG/PNG up to 300px x 300px allowed."
      }
    }
  }

  removeImage() {
    this.previewUrl = null;
    this.file = null;
    this.onChange(this.file);
    this.onTouched();
    const input = document.getElementById('fileInput') as HTMLInputElement;
    if (input) input.value = '';
  }

  isValidImage(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png'];
    return validTypes.includes(file.type);
  }

  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};
  // ==== ControlValueAccessor Implementation ====

  writeValue(value: any): void {
    this.file = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
