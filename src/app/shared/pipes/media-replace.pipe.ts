import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
@Pipe({
  name: 'mediaReplace',
  standalone: true,
})
@Injectable({ providedIn: 'root' })
export class MediaReplacePipe implements PipeTransform {
  transform(
    value: string,
    searchValue: string = 'https://swalac-media.s3.amazonaws.com/',
    searchValue2: string = 'https://swalac-media-prod.s3.amazonaws.com/',
    replaceValue: string = `${environment.mideaUrl}/`
  ): unknown {
    if (!value || !searchValue) {
      return value; // Return the original string if input is invalid or missing.
    }
    if(environment.apiUrl == "https://sas.swalac.com/backend/api"){
      return value.replace(new RegExp(searchValue2, 'g'), replaceValue);
    }
    return value.replace(new RegExp(searchValue, 'g'), replaceValue);
  }
}
