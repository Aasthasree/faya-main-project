import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {
  transform(value: number, totalmarks: number, decimal: number): unknown {
    return (value / totalmarks * 100).toFixed(decimal)
  }
}
