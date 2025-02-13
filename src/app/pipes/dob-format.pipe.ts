import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dobFormat',
  standalone: true
})
export class DobFormatPipe implements PipeTransform {

  transform(dob: string): string {
    if (!dob || dob.length !== 8) {
      return dob;
    }

    const day = dob.substring(0, 2);
    const month = dob.substring(2, 4);
    const year = dob.substring(4, 8);

    return `${day}/${month}/${year}`;
  }

}
