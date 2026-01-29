import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private translate: TranslateService) { }


  // ==================================
  // getErrorMessage(
  //   control: AbstractControl,
  //   controlName: string,
  //   fieldName?: string
  // ): string[] | null {
  //   const formattedControlName = this.convertCamelCaseToNormalText(controlName);
  //   // Properly narrow the type of `control` and `control.errors`
  //   if (control && control.touched && control.errors) {
  //     const errors = control.errors; // `errors` is now non-null
  //     const field = this.translate.instant(fieldName ?? formattedControlName);

  //     return Object.keys(errors).map((error) => {
  //       switch (error) {
  //         case 'required':
  //           return this.translate.instant('errors.required', { field });

  //         case 'minlength': {
  //           const minlengthError = errors[error] as { requiredLength: number };
  //           return this.translate.instant('errors.minlength', {
  //             field,
  //             requiredLength: minlengthError.requiredLength,
  //           });
  //         }

  //         case 'maxlength': {
  //           const maxlengthError = errors[error] as { requiredLength: number };
  //           return this.translate.instant('errors.maxlength', {
  //             field,
  //             requiredLength: maxlengthError.requiredLength,
  //           });
  //         }

  //         case 'min': {
  //           const minError = errors[error] as { min: number };
  //           return this.translate.instant('errors.min', {
  //             field,
  //             min: minError.min,
  //           });
  //         }

  //         case 'max': {
  //           const maxError = errors[error] as { max: number };
  //           return this.translate.instant('errors.max', {
  //             field,
  //             max: maxError.max,
  //           });
  //         }

  //         case 'pattern':
  //           return this.translate.instant('errors.pattern', { field });

  //         case 'arabicLetters':
  //           return this.translate.instant('errors.arabicLetters', { field });

  //         case 'validNumber':
  //           return this.translate.instant('errors.validNumber', { field });

  //         case 'nonEmptyString':
  //           return this.translate.instant('errors.nonEmptyString', { field });

  //         case 'email':
  //           return this.translate.instant('errors.email');

  //         case 'endDateBeforeStartDate':
  //           return this.translate.instant('errors.endDateBeforeStartDate');

  //         case 'matchPassword':
  //         case 'mismatch':
  //           return this.translate.instant('errors.passwordMismatch');

  //         case 'customError':
  //           return this.translate.instant(errors[error] as string);

  //         default:
  //           return this.translate.instant('errors.unknown');
  //       }
  //     });
  //   }
  //   return null;
  // }
  // ==================================


  getErrorMessage(
    control: AbstractControl,
    controlName: string,
    fieldName?: any,
    apiErrors?: { [key: string]: boolean }
  ): string[] | null {
    const formattedControlName = this.convertCamelCaseToNormalText(fieldName ?? controlName);
    const field = this.translate.instant(formattedControlName);

    const hasApiError = apiErrors?.[controlName] === true;
    const shouldShowError = hasApiError || (control && control.touched && control.errors);

    if (!shouldShowError || !control?.errors) return null;

    const errors = control.errors;

    return Object.keys(errors).map((error) => {
      switch (error) {
        case 'required':
          return this.translate.instant('errors.required', { field });

        case 'minlength': {
          const minlengthError = errors[error] as { requiredLength: number };
          return this.translate.instant('errors.minlength', {
            field,
            requiredLength: minlengthError.requiredLength,
          });
        }

        case 'maxlength': {
          const maxlengthError = errors[error] as { requiredLength: number };
          return this.translate.instant('errors.maxlength', {
            field,
            requiredLength: maxlengthError.requiredLength,
          });
        }

        case 'min': {
          const minError = errors[error] as { min: number };
          return this.translate.instant('errors.min', {
            field,
            min: minError.min,
          });
        }

        case 'max': {
          const maxError = errors[error] as { max: number };
          return this.translate.instant('errors.max', {
            field,
            max: maxError.max,
          });
        }

        case 'pattern':
          return this.translate.instant('errors.pattern', { field });

        case 'arabicLetters':
          return this.translate.instant('errors.arabicLetters', { field });

        case 'validNumber':
          return this.translate.instant('errors.validNumber', { field });

        case 'nonEmptyString':
          return this.translate.instant('errors.nonEmptyString', { field });

        case 'email':
          return this.translate.instant('errors.email');

        case 'endDateBeforeStartDate':
          return this.translate.instant('errors.endDateBeforeStartDate');

        case 'matchPassword':
        case 'mismatch':
          return this.translate.instant('errors.passwordMismatch');

        case 'customError':
          return this.translate.instant(errors[error] as string);

        case 'tooMany':
          return this.translate.instant('errors.fileTooMany', { field });

        case 'invalidFiles':
          return this.translate.instant('errors.invalidFileTypeOrSize', { field });

        case 'processingFailed':
          return this.translate.instant('errors.fileProcessingFailed', { field });

        default:
          return this.translate.instant('errors.unknown');
      }
    });
  }

  customErrorValidator(errorMessage: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value ? null : { customError: errorMessage };
    };
  }

  convertCamelCaseToNormalText(camelCase: string): string {
    if (!camelCase) return camelCase;

    // Remove text before a period
    const noPrefix = camelCase.includes('.')
      ? camelCase.split('.').pop()!.trim()
      : camelCase.trim();
    // Convert camelCase to normal text
    const result = noPrefix
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
    // Remove _ from text
    return result.replaceAll('_', ' ').trim();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirm_password');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      confirmPassword?.setErrors(null)
      return null;
    }

  }

  checkEndDateAfterStartDate(startDateField: string, endDateField: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const startDate = form.get(startDateField)?.value;
      const endDate = form.get(endDateField)?.value;

      if (!startDate || !endDate) {
        return null;
      }

      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        form.get(endDateField)?.setErrors({ endDateBeforeStartDate: true });
        return { endDateBeforeStartDate: true };
      } else {
        form.get(endDateField)?.setErrors(null);
      }

      return null;
    };
  }


}
