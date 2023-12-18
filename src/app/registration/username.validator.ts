import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidator {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    // value.trim() removes leading and trailing spaces
    // value.trim().length !== value.length checks if there are spaces in the middle
    if (value.trim().length !== value.length) {
      return { cannotContainSpace: true };
    }
    return null;
  }
}  