import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'validDate',
})
export class ValidDatePipe implements PipeTransform {
  constructor() {}

  transform(value: string): string {
    const datePipe = new DatePipe('en-US'); // Adjust the locale accordingly

    const parsedDate = new Date(value);

    if (isNaN(parsedDate.getTime())) {
      // If the date is invalid, return today's date
      return datePipe.transform(new Date(), 'shortDate');
    } else {
      // If the date is valid, return the formatted date
      return datePipe.transform(parsedDate, 'shortDate');
    }
  }
}

