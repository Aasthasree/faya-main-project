import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidator {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;

    // Adding a null check before using trim()
    if (value !== null && value.trim().length !== value.length) {
      return { cannotContainSpace: true };
    }

    return null;
  }
}