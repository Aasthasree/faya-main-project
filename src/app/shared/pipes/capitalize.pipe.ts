import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value.replace(/_/g, ' ').replace(/\b\w/g, firstChar => firstChar.toUpperCase());
  }
}