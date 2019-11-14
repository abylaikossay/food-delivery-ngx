import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DatePipe implements PipeTransform {

  transform(value: any): Date {
    const customDate = new Date (value.match(/\d+/)[0] * 1 );
    return customDate;
  }

}
