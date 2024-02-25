import { Pipe, PipeTransform } from '@angular/core';
import {Period} from "../model/period.enum";

@Pipe({
  standalone: true,
  name: 'period'
})
export class PeriodPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case Period.YEAR:
        return "Year";
      case Period.HALF_YEAR:
        return "Half year";
      case Period.QUARTER_YEAR:
        return "Quarter year"
      case Period.MONTH:
        return "Month";
      case Period.WEEK:
        return "Week";
      default:
        return "error";
    }
  }
}
