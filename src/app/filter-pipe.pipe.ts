import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {
  transform(list: any, filterBy: string) {
    if (filterBy.toLowerCase() === 'all' || filterBy === '' || list.length === 0) {
      return list;
    } else {
      return list.filter((std) => {
        return std.gender.toLowerCase() === filterBy.toLowerCase()
      })
    }
  }
}
